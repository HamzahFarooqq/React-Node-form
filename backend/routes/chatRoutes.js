
import express from "express";
// import OpenAI from "openai";
// import fetch from "node-fetch";
import Chat from "../models/Chat.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();





router.post("/", async (req, res) => {
  const { message } = req.body;
//   const userId = req.user.id; // comes from JWT
  const userId = 5; 

  try {
    // Call OpenAI API
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: message }]
    //   })
    // });

    // const data = await response.json();
    // console.log("OpenAI raw response:", data);

    // const botReply = data.choices[0].message.content;


    // Call Hugging Face Inference API
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message
      })
    });

    const data = await response.json();    
    const botReply = data[0]?.generated_text || "Sorry, I couldn't generate a response.";





    // Save chat to MongoDB
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }
    chat.messages.push({ sender: "user", text: message });
    chat.messages.push({ sender: "bot", text: botReply });
    await chat.save();

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot error" });
  }
});

export default router;
