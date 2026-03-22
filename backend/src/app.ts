import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import flowRoutes from "./routes/flow.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", aiRoutes);
app.use("/api/flow", flowRoutes);

export default app;