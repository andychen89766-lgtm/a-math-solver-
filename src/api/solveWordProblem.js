import axios from "axios";

export default async function handler(req, res) {
  const { problem } = req.body;
  if (!problem) return res.status(400).json({ error: "No problem provided" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "user", content: `Solve this math word problem: ${problem}` }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return res.status(200).json({
      answer: response.data.choices[0].message.content
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to solve problem" });
  }
}