// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Simple health check
app.get("/", (req, res) => {
    res.send("4Serve Backend is running!");
});

// Chatbot route
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful AI assistant for 4Serve." },
                { role: "user", content: message },
            ],
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
