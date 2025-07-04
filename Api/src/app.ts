import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger";
import awardRoutes from "./routes/award-routes";

const app = express();

// Middleware para JSON
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da API
app.use("/api", awardRoutes);

export default app;
