import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes";
import flowRoutes from "./routes/flow.routes";

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));

app.get("/", (_req, res) => {
  res.json({ message: "success" });
});

app.use("/api", aiRoutes);
app.use("/api/flow", flowRoutes);

export default app;