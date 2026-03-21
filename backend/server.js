import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/ask-ai", async (req, res) => {
    console.log(req.body);
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            //   "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                // model: "mistralai/mistral-7b-instruct:free",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                 "Content-Type": "application/json",
                },
            }
        );

        const aiMessage = response.data.choices[0].message.content;

        res.json({ response: aiMessage });
    } catch (error) {
        ''
        let response = error?.response
        let message = response?.data?.error?.message || response?.statusText
        res.status(response?.status || 500)
            .json({ error: message || "Something went wrong" });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})