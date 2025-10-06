import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();
const baseUrl = "/api/v1";

app.get("/", (req, res) => {
    res.send("TEGNO TALENT BACKEND");
});

app.use(express.json());
app.use(`${baseUrl}/users`, userRoutes);
app.use(errorHandler);

export default app;



