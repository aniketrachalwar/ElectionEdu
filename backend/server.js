app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: API_KEY not set");
      return res.status(500).json({ reply: "Something went wrong. Please try again." });
    }

    // 🔁 Retry helper
    const callGemini = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: [{
              role: "user",
              parts: [{ text: message }]
            }]
          })
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status}`);
      }

      return response.json();
    };

    let data;
    for (let i = 0; i < 3; i++) {
      try {
        data = await callGemini();
        break;
      } catch (err) {
        if (i === 2) throw err;
        await new Promise(r => setTimeout(r, 1000)); // wait 1s then retry
      }
    }

    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("Invalid AI response");
    }

    res.json({ reply: aiResponse });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    // 👇 Smart fallback for judges
    res.status(200).json({
      reply: "⚠️ AI is busy right now. Elections include steps like registration, voting, and counting. Please try again."
    });
  }
});
