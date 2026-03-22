import { Router } from "express";
import { askAI } from "../controllers/ai.controllers.js";

const router = Router();

router.post("/ask-ai", askAI);

export default router;