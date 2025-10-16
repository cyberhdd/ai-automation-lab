import express from "express";
import axios from "axios";
const router = express.Router();

// placeholder route
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    // later we'll call Python's offline RAG model here
    return res.json({ reply: `You said: ${message}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
