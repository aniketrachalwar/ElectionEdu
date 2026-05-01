import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file (for local development)
dotenv.config();

const app = express();

// Use PORT from environment (required by Render/Railway) or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the "public" directory
app.use(express.static('public'));

const SYSTEM_PROMPT = `You are an Election Education Assistant for India.

Teach step-by-step:
1. Voter Registration
2. Candidate Selection
3. Campaigning
4. Voting Day
5. Counting Votes
6. Results

Rules:
* Detect user's language and reply in same language (Hindi, Marathi, English, etc.)
* Explain like a 10th class student
* Keep answers under 100 words
* Stay neutral (no political bias)
* Guide step-by-step

After each explanation:
* Ask a simple question
* Offer next step`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Message is required." });
        }

        // SECURE: API key is loaded from environment, NEVER hardcoded.
        // It is kept strictly on the backend, never sent to the frontend.
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("CRITICAL ERROR: API_KEY environment variable is not set.");
            return res.status(500).json({ reply: "Something went wrong. Please try again." });
        }

        // Send request to AI API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: [{
                    role: "user",
                    parts: [{ text: message }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`AI API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Extract AI response
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiResponse) {
            res.json({ reply: aiResponse });
        } else {
            throw new Error("Invalid response format from AI API");
        }

    } catch (error) {
        console.error("Error communicating with AI API:", error.message);
        // Fallback error message exactly as requested
        res.status(500).json({ reply: "Something went wrong. Please try again." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

