// import cors from "cors";
// import axios from "axios";
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import { model as flow } from "./src/models/index.js";

// dotenv.config()  /// Load env data

// let uri = process.env.MONGO_URI

// const app = express();

// app.use(cors());
// app.use(express.json({ strict: false }));

// mongoose
//     .connect(uri, { family: 4 })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error(err));

// app.get("/", async (req, res) => {
//     try {
//         res.status(200).json({ message: "success"});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Get failed" });
//     }
// });

// app.post("/api/ask-ai", async (req, res) => {
//     console.log(req.body);
//     try {
//         const { prompt } = req.body;

//         const response = await axios.post(
//             // "https://api.groq.com/openai/v1/chat/completions",
//               "https://openrouter.ai/api/v1/chat/completions",
//             {
//                 // model: "llama-3.1-8b-instant",
//                 model: "openrouter/free",
//                 max_tokens: 100,
//                 messages: [
//                     {
//                         role: "user",
//                         content: prompt,
//                     },
//                 ],
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         const aiMessage = response.data.choices[0].message.content;

//         res.json({ response: aiMessage });
//     } catch (error) {
//         ''
//         let response = error?.response
//         let message = response?.data?.error?.message || response?.statusText
//         res.status(response?.status || 500)
//             .json({ error: message || "Something went wrong" });
//     }
// });


// app.post("/api/flow", async (req, res) => {
//     try {
//         const { prompt, response } = req.body;
//         if (!prompt || !response) {
//             return res.status(400).json({ error: "Missing data" });
//         }
//         let newFlow = new flow({
//             prompt,
//             response,
//             created_at: new Date().getTime(),
//             modified_at: new Date().getTime(),
//         });
//         let savedFlow = await newFlow.save()
//         res.status(201).json(savedFlow);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Save failed" });
//     }
// });

// app.get("/api/flow", async (req, res) => {
//     try {
//         let savedFlows = await flow.find()
//         res.status(200).json(savedFlows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Get failed" });
//     }
// });

// app.delete("/api/flow/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedFlow = await flow.findByIdAndDelete(id);

//         if (!deletedFlow) {
//             return res.status(404).json({ error: "Flow not found" });
//         }

//         res.status(200).json({ message: "Flow deleted successfully", deletedFlow });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Delete failed" });
//     }
// });

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`)
// })    

import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const URI: string  = process.env.MONGO_URI as string
connectDB(URI)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});