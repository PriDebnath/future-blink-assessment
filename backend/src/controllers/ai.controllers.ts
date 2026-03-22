import axios from "axios";
import { Request, Response } from "express";

export const askAI = async (req: Request, res: Response) => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
  const openrouterApi = "https://openrouter.ai/api/v1/chat/completions"
  const groqApi = "https://api.groq.com/openai/v1/chat/completions"
  const llms = {
    "llama": "llama-3.1-8b-instant",
    "openrouter-free": "openrouter/free"
  }
  try {
    const { prompt }: { prompt: string } = req.body;

    const response = await axios.post(
      openrouterApi,
      {
        model: llms["openrouter-free"],
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    res.json({ response: aiMessage });
  } catch (error: any) {
    const response = error?.response;
    const message =
      response?.data?.error?.message || response?.statusText;

    res
      .status(response?.status || 500)
      .json({ error: message || "Something went wrong" });
  }
};