require("dotenv").config();
const cors = require("cors");
const OpenAI = require("openai");
const express = require("express");
const path = require("path");

const app = express();


// Middleware
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());


// Serve Frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ AI Chat Route
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// ✅ AI Chat Route (SAFE VERSION)
app.post("/ask-ai", async (req, res) => {
  try {
    const { message } = req.body;

    // TEMP TEST (no OpenAI yet)
    const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are a medical assistant. Give short, safe answers. Always suggest consulting a doctor."
    },
    {
      role: "user",
      content: message
    }
  ],
});

res.json({
  reply: response.choices[0].message.content
});

  } catch (error) {
    console.log(error);
    res.json({ reply: "AI error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});