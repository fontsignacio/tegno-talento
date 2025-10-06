# 🧩 Integración de Google Forms con API Node.js

Este documento describe los pasos para conectar un **Google Form** con un **backend Node.js** usando **Google Apps Script** como webhook.  
Cada vez que alguien complete el formulario, se enviará un **POST JSON** a la API con las respuestas.

---

## 🚀 Requisitos

- Un **Google Form** existente.
- Un **backend en Node.js** con un endpoint público (`POST /api/v1/forms`).  
- Una **clave secreta compartida** (`SHARED_SECRET`) para autenticar la solicitud. (crear en .env)
- Una cuenta [ngrok](https://ngrok.com) para exponer tu backend localmente.

---

## 🧭 1. Crear el Script vinculado al Form

1. En el **Google Form**, haz clic en ⋮ (tres puntos) → **App Script**.  
   Se abrirá el editor de **Apps Script** vinculado al formulario.

2. Reemplazá el contenido por este script:

```javascript
const API_URL = '[Remplazar por ngrok url]/api/v1/forms';
const SHARED_SECRET = 'super-secreto-123'; // mismo valor en tu backend

function onFormSubmit(e) {
  try {
    if (!e || !e.response) throw new Error('Evento sin e.response');

    const form = FormApp.getActiveForm();
    const formTitle = form ? form.getTitle() : 'Google Form';

    const resp = e.response;
    const submittedAt = resp.getTimestamp().toISOString();
    
    const respondentEmail = (typeof resp.getRespondentEmail === 'function')
      ? resp.getRespondentEmail()
      : null;

    
    const values = {};
    resp.getItemResponses().forEach(ir => {
      const question = ir.getItem().getTitle();
      let answer = ir.getResponse();

      
      if (Array.isArray(answer)) {
       
        answer = answer.map(v => String(v ?? '').trim());
      } else if (answer == null) {
        answer = '';
      } else if (typeof answer === 'object') {
        // Posible “Subida de archivos”: lista de DriveFile(s)
        // Intentamos extraer IDs/nombres sin romper si no hay permisos
        try {
          if (Array.isArray(ir.getResponse())) {
            answer = ir.getResponse().map(f => {
              // f: DriveFile
              if (f && typeof f.getId === 'function') {
                return {
                  id: f.getId(),
                  name: f.getName && f.getName(),
                  // Link de visualización
                  url: 'https://drive.google.com/open?id=' + f.getId(),
                };
              }
              return String(f);
            });
          } else {
            answer = String(answer);
          }
        } catch (_err) {
          // Si no hay scope de Drive, devolvemos algo serializable
          answer = '[file-uploaded]';
        }
      } else {
        answer = String(answer).trim();
      }
      values[question] = answer;
    });

    const payload = { formTitle, submittedAt, respondentEmail, values };

    const res = UrlFetchApp.fetch(API_URL, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: { 'X-Webhook-Secret': SHARED_SECRET },
      muteHttpExceptions: true,
    });

    if (res.getResponseCode() >= 300) {
      console.error('POST falló:', res.getResponseCode(), res.getContentText());
    }
  } catch (err) {
    console.error('Error onFormSubmit (Forms):', err);
  }
}

```

---

## ⚙️ 2. Crear el Trigger

1. En el editor de Apps Script → ícono del **reloj** ⏰ → “**Añadir desencadenador**”.
2. Configurá:
   - Función: `onFormSubmit`
   - Fuente: **Formulario**
   - Evento: **Al enviar formulario**
3. Guardá y **autorizá los permisos** (el script necesita acceso al formulario y a internet).


## 🧪 3. Prueba

1. Abre una conexion de ngrok a tu url local con `npx ngrok http 3000`
2. Actualiza la url que te entrega ngrok en el app script
3. Guardá el script en Apps Script.
4. Asegurate de que el trigger esté activo.  
5. Completá una respuesta en el Form.
6. En tu backend deberías ver algo así:

```bash
📥 Nueva respuesta de Google Form:
{
  formTitle: 'Formulario de contacto',
  submittedAt: '2025-10-06T12:33:02.000Z',
  respondentEmail: 'usuario@ejemplo.com',
  values: {
    'Nombre': 'Lautaro Romano',
    'Mensaje': 'Hola, quiero más info'
  }
}
```

---

## 🧩 6. Estructura del payload

```json
{
  "formTitle": "Formulario de contacto",
  "submittedAt": "2025-10-06T12:33:02.000Z",
  "respondentEmail": "usuario@ejemplo.com",
  "values": {
    "Nombre": "Juan Pérez",
    "Correo electrónico": "juan@example.com",
    "Mensaje": "Necesito soporte"
  }
}
```

---
