import { Router } from "express";
import {
  createFlow,
  getFlows,
  deleteFlow,
} from "../controllers/flow.controllers";

const router = Router();

router.post("/", createFlow);
router.get("/", getFlows);
router.delete("/:id", deleteFlow);

export default router;