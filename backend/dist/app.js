"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
// Import all route modules
const areaRoutes_1 = __importDefault(require("./routes/areaRoutes"));
const puestoRoutes_1 = __importDefault(require("./routes/puestoRoutes"));
const habilidadRoutes_1 = __importDefault(require("./routes/habilidadRoutes"));
const empleadoRoutes_1 = __importDefault(require("./routes/empleadoRoutes"));
const vacanteRoutes_1 = __importDefault(require("./routes/vacanteRoutes"));
const puestoHabilidadRoutes_1 = __importDefault(require("./routes/puestoHabilidadRoutes"));
const empleadoHabilidadRoutes_1 = __importDefault(require("./routes/empleadoHabilidadRoutes"));
const empleadoRespuestaFormularioRoutes_1 = __importDefault(require("./routes/empleadoRespuestaFormularioRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const baseUrl = "/api/v1";
app.get("/", (req, res) => {
    res.send("TEGNO TALENT BACKEND - API REST");
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN || /http:\/\/localhost:5\d{3}$/,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Register all routes
app.use(`${baseUrl}/areas`, areaRoutes_1.default);
app.use(`${baseUrl}/puestos`, puestoRoutes_1.default);
app.use(`${baseUrl}/habilidades`, habilidadRoutes_1.default);
app.use(`${baseUrl}/empleados`, empleadoRoutes_1.default);
app.use(`${baseUrl}/vacantes`, vacanteRoutes_1.default);
app.use(`${baseUrl}/puesto-habilidades`, puestoHabilidadRoutes_1.default);
app.use(`${baseUrl}/empleado-habilidades`, empleadoHabilidadRoutes_1.default);
app.use(`${baseUrl}/empleado-respuestas-formulario`, empleadoRespuestaFormularioRoutes_1.default);
app.use(`${baseUrl}/perfiles`, profileRoutes_1.default);
app.use(errorHandler_1.default);
exports.default = app;
