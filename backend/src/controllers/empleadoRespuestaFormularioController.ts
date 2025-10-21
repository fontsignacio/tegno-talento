import { Request, Response } from "express";
import * as empleadoRespuestaFormularioService from "../services/empleadoRespuestaFormularioService";
import { CreateEmpleadoRespuestaFormularioDTO, UpdateEmpleadoRespuestaFormularioDTO } from "../types/empleadoRespuestaFormulario";
import { tipo_empleado, tipo_motivacion } from "@prisma/client";
import { SistemaExperto } from "../helpers/sistema_experto";
import { createEmpleado } from "../services/empleadoService";

export const getAllEmpleadoRespuestasFormulario = async (req: Request, res: Response) => {
  try {
    const respuestas = await empleadoRespuestaFormularioService.getAllEmpleadoRespuestasFormulario();
    res.json(respuestas);
  } catch (error) {
    console.error("Error getting empleado respuestas formulario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmpleadoRespuestaFormularioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    const respuesta = await empleadoRespuestaFormularioService.getEmpleadoRespuestaFormularioById(id);
    if (!respuesta) {
      return res.status(404).json({ error: "Respuesta not found" });
    }

    res.json(respuesta);
  } catch (error) {
    console.error("Error getting respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRespuestasByEmpleado = async (req: Request, res: Response) => {
  try {
    const empleadoId = parseInt(req.params.empleadoId);
    if (isNaN(empleadoId)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    const respuestas = await empleadoRespuestaFormularioService.getRespuestasByEmpleado(empleadoId);
    res.json(respuestas);
  } catch (error) {
    console.error("Error getting respuestas by empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {

    const responsesStruct: Record<string, Record<string, number> | null> = {
      '¿Disfrutas resolver acertijos, rompecabezas o problemas lógicos?': {
        'Nada': 1,
        "Poco": 2,
        "Más o menos": 3,
        "Bastante": 4,
        "Mucho": 5
      },
      '¿Eres detallista y te gusta encontrar errores en lo que otros hicieron?': {
        'Nada': 1,
        "Poco": 2,
        "Más o menos": 3,
        "Bastante": 4,
        "Mucho": 5
      },
      '¿Te gusta organizar a un grupo de personas para lograr un objetivo?': {
        'Nada': 1,
        "Poco": 2,
        "Más o menos": 3,
        "Bastante": 4,
        "Mucho": 5
      },
      '¿Te entusiasma aprender cosas nuevas en tecnología, aunque no las entiendas\nal principio?': {
        'Nada': 1,
        "Poco": 2,
        "Más o menos": 3,
        "Bastante": 4,
        "Mucho": 5
      },
      '¿Qué te motiva más?': null
    };

    const questionsMapper: Record<string, string> = {
      '¿Disfrutas resolver acertijos, rompecabezas o problemas lógicos?': 'disfrute_logica',
      '¿Eres detallista y te gusta encontrar errores en lo que otros hicieron?': 'detalle',
      '¿Te gusta organizar a un grupo de personas para lograr un objetivo?': 'liderazgo',
      '¿Te entusiasma aprender cosas nuevas en tecnología, aunque no las entiendas\nal principio?': 'curiosidad_tecnologica',
      '¿Qué te motiva más?': 'motivacion'
    };

    const listOfQuestions = [
      '¿Disfrutas resolver acertijos, rompecabezas o problemas lógicos?',
      '¿Eres detallista y te gusta encontrar errores en lo que otros hicieron?',
      '¿Te gusta organizar a un grupo de personas para lograr un objetivo?',
      '¿Te entusiasma aprender cosas nuevas en tecnología, aunque no las entiendas\nal principio?',
      '¿Qué te motiva más?',
      '¿Cuál es tu nombre?',
    ]

    const tipoMotivacionMap: Record<string, string> = {
      'Crear cosas': tipo_motivacion.crear,
      'Arreglar problemas': tipo_motivacion.arreglar,
      'Coordinar personas': tipo_motivacion.coordinar
    };


    //Seguridad
    /* const headerSecret = req.header('X-Webhook-Secret');
    if (headerSecret !== process.env.SHARED_SECRET) {
        return res.status(401).json({ error: 'unauthorized' });
    } */

    const { formTitle, submittedAt, row, respondentEmail, values } = req.body || {};
    console.log({ formTitle, submittedAt, row, respondentEmail, values })

    const empleado: any = {};
    const respuestaFormulario: any = {}

    for (const question of listOfQuestions) {
      if (question === '¿Cuál es tu nombre?') {
        const sistemaExperto = new SistemaExperto();
        empleado.nombre = values[question];
        empleado.correo = respondentEmail || '';
        empleado.tipo_empleado = tipo_empleado.EXTERNO;
        const sisExpertoResponse = await sistemaExperto.inferirPuesto(respuestaFormulario.disfrute_logica, respuestaFormulario.detalle, respuestaFormulario.liderazgo, respuestaFormulario.curiosidad_tecnologica, respuestaFormulario.motivacion);
        empleado.puesto_id = sisExpertoResponse.id_puesto;
        const empleadoResponse = await createEmpleado(empleado);

        respuestaFormulario.empleado_id = empleadoResponse.id_empleado;
        await empleadoRespuestaFormularioService.createEmpleadoRespuestaFormulario(respuestaFormulario);
      }
      
      if(question === '¿Qué te motiva más?') {
        const rawAnswer = values[question];
        const mappedValue = tipoMotivacionMap[rawAnswer];
        respuestaFormulario[questionsMapper[question]] = mappedValue;
        continue;
      }

      const answer = values[question];
      if (!!questionsMapper[question]) {
        const key = questionsMapper[question];
        const mapping = responsesStruct[question];
        if (mapping) {
          respuestaFormulario[key] = mapping[answer];
        } else {
          // For open-ended questions (null mapping) store raw answer
          respuestaFormulario[key] = answer;
        }
      }

    }

    /* const data2: CreateEmpleadoRespuestaFormularioDTO = req.body;
    const respuesta = await empleadoRespuestaFormularioService.createEmpleadoRespuestaFormulario(data2);
    res.status(201).json(respuesta); */
    res.json({ ok: true });
  } catch (error) {
    console.error("Error creating respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    const data: UpdateEmpleadoRespuestaFormularioDTO = req.body;
    const respuesta = await empleadoRespuestaFormularioService.updateEmpleadoRespuestaFormulario(id, data);
    if (!respuesta) {
      return res.status(404).json({ error: "Respuesta not found" });
    }

    res.json(respuesta);
  } catch (error) {
    console.error("Error updating respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    await empleadoRespuestaFormularioService.deleteEmpleadoRespuestaFormulario(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
