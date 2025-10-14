import { Request, Response, NextFunction } from "express";



export const validateCreateVacante = (req: Request, res: Response, next: NextFunction) => {
    const {
      descripcion,
      fecha_cierre,
      puesto_id,
      peso_experiencia,
      peso_educacion,
      experiencia_req,
      nivel_educ_req,
      puntaje_corte,
      vacante_habilidades,
    } = req.body;
  
    // Validar campos obligatorios de la vacante
    if (!puesto_id) return res.status(400).json({ error: "El puesto_id es obligatorio" });
    if (peso_experiencia == null) return res.status(400).json({ error: "peso_experiencia es obligatorio" });
    if (peso_educacion == null) return res.status(400).json({ error: "peso_educacion es obligatorio" });
    if (experiencia_req == null) return res.status(400).json({ error: "experiencia_req es obligatorio" });
    if (nivel_educ_req == null) return res.status(400).json({ error: "nivel_educ_req es obligatorio" });
    if (puntaje_corte == null) return res.status(400).json({ error: "puntaje_corte es obligatorio" });
  
    // Validar habilidades
    if (!Array.isArray(vacante_habilidades) || vacante_habilidades.length === 0) {
      return res.status(400).json({ error: "La vacante debe tener al menos una habilidad" });
    }
  
    for (const [index, vh] of vacante_habilidades.entries()) {
      if (vh.habilidad_id == null)
        return res.status(400).json({ error: `La habilidad en posición ${index} debe tener un id` });
      if (vh.nivel_requerido == null || vh.nivel_requerido < 1 || vh.nivel_requerido > 5)
        return res.status(400).json({ error: `La habilidad en posición ${index} debe tener nivel_requerido entre 1 y 5` });
      if (vh.peso == null || vh.peso < 0 || vh.peso > 100)
        return res.status(400).json({ error: `La habilidad en posición ${index} debe tener peso entre 0 y 100` });
      if (vh.critica != null && typeof vh.critica !== "boolean")
        return res.status(400).json({ error: `La habilidad en posición ${index} tiene critica inválido` });
    }
  
    next();
  };
  