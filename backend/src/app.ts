import express, { Application } from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";

// Import all route modules
import areaRoutes from "./routes/areaRoutes";
import puestoRoutes from "./routes/puestoRoutes";
import habilidadRoutes from "./routes/habilidadRoutes";
import empleadoRoutes from "./routes/empleadoRoutes";
import vacanteRoutes from "./routes/vacanteRoutes";
import puestoHabilidadRoutes from "./routes/puestoHabilidadRoutes";
import empleadoHabilidadRoutes from "./routes/empleadoHabilidadRoutes";
import empleadoRespuestaFormularioRoutes from "./routes/empleadoRespuestaFormularioRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app: Application = express();
const baseUrl = "/api/v1";

app.get("/", (req, res) => {
    res.send("TEGNO TALENT BACKEND - API REST");
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || /http:\/\/localhost:5\d{3}$/,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Register all routes
app.use(`${baseUrl}/areas`, areaRoutes);
app.use(`${baseUrl}/puestos`, puestoRoutes);
app.use(`${baseUrl}/habilidades`, habilidadRoutes);
app.use(`${baseUrl}/empleados`, empleadoRoutes);
app.use(`${baseUrl}/vacantes`, vacanteRoutes);
app.use(`${baseUrl}/puesto-habilidades`, puestoHabilidadRoutes);
app.use(`${baseUrl}/empleado-habilidades`, empleadoHabilidadRoutes);
app.use(`${baseUrl}/empleado-respuestas-formulario`, empleadoRespuestaFormularioRoutes);
app.use(`${baseUrl}/perfiles`, profileRoutes);

app.use(errorHandler);

export default app;



