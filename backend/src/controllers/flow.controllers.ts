import { Request, Response } from "express";
import { model as FlowModel } from "../models/index";

export const createFlow = async (req: Request, res: Response) => {
  try {
    const { prompt, response }: { prompt: string; response: string } =
      req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newFlow = new FlowModel({
      prompt,
      response,
      created_at: Date.now(),
      modified_at: Date.now(),
    });

    const savedFlow = await newFlow.save();

    res.status(201).json(savedFlow);
  } catch {
    res.status(500).json({ error: "Save failed" });
  }
};

export const getFlows = async (_req: Request, res: Response) => {
  try {
    const flows = await FlowModel.find();
    res.status(200).json(flows);
  } catch {
    res.status(500).json({ error: "Get failed" });
  }
};

export const deleteFlow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await FlowModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Flow not found" });
    }

    res.status(200).json({
      message: "Flow deleted successfully",
      deleted,
    });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};