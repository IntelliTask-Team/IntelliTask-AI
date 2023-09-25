const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPEN_AI_KEY;

router.post("/openai", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
