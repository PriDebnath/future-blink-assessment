import { Router } from "express";
import { askAI } from "../controllers/ai.controllers";

const router = Router();

router.post("/ask-ai", askAI);

export default router;