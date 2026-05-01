# 🗳️ ElectionEdu – AI Election Process Tutor

**Live Demo:** https://electionedu.onrender.com
**GitHub:** https://github.com/aniketrachalwar/ElectionEdu
**LinkedIn (Build-in-Public):** https://linkedin.com/your-post

> ⚠️ Note: The app may take 20–30 seconds to wake up (free hosting).

---

## 🚀 What this is

**ElectionEdu** is a lightweight AI tutor that teaches the **Indian election process step-by-step** and answers questions in **Hindi, Marathi, or English**—designed for first-time voters and students.

---

## ❗ Problem

Election information is:

* hard to understand
* scattered across sources
* not interactive

👉 Result: low clarity for new voters.

---

## 💡 Solution

A **chat-based assistant** that:

* explains each stage in simple language (10th-grade level)
* guides users through the full flow
* answers questions in the user’s language

---

## ✨ Key Features

* 🧠 **AI Tutor** (step-by-step learning)
* 🌐 **Multi-language** (auto-detect Hindi/Marathi/English)
* 🪜 **Guided Flow** (Registration → Results)
* ⚡ **Fast & minimal** (no login, no DB)
* 🛡️ **Resilient UX** (retry + fallback when API is busy)

---

## 🧩 Learning Flow

1. Voter Registration
2. Candidate Selection
3. Campaigning
4. Voting Day
5. Vote Counting
6. Results & Government Formation

---

## 🏗️ Architecture (simple & hackathon-ready)

```
User (Browser)
   ↓
Static UI (HTML/CSS/JS served by Express)
   ↓
POST /chat
   ↓
Node.js (Express)
   ↓
Gemini API
   ↓
Response → UI
```

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, Vanilla JS
* **Backend:** Node.js + Express
* **AI:** Google Gemini (Flash)
* **Hosting:** Render (single container)
* **Version Control:** GitHub

---

## 📦 Project Structure

```
ElectionEdu/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md
```

---

## ▶️ Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/ElectionEdu.git
cd ElectionEdu/backend
npm install
```

Create `.env`:

```
API_KEY=your_gemini_api_key_here
```

Start:

```bash
node server.js
```

Open:

```
http://localhost:3000
```

---

## ☁️ Deployment (Render)

* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `node server.js`
* Env Var: `API_KEY=your_key`

---

## 🧪 Test Cases

Try:

* “What is voter registration?”
* “मतदान क्या है?”
* “मतदान कसे होते?”

Expect:

* simple explanation
* same-language response
* guided next step

---

## 🛡️ Reliability & Security

* API key via **environment variables** (never in frontend)
* **Retry + timeout** for API calls
* **Graceful fallback** message if AI is busy

---

## ⚠️ Known Limitations

* Occasional delay if AI API is busy
* Cold start on free hosting

---

## 🔮 Future Improvements

* Quiz after each step
* Voice input/output
* Visual timeline of election stages

---

## 📸 Screenshots

<img width="706" height="416" alt="image" src="https://github.com/user-attachments/assets/34e6bd8d-859f-469b-a86f-6af9c82f97ba" />
<img width="1384" height="815" alt="Screenshot 2026-05-01 190538" src="https://github.com/user-attachments/assets/1df6d20f-0aff-4122-8927-831faf1da1f5" />
<img width="736" height="404" alt="image" src="https://github.com/user-attachments/assets/f0859486-c1e1-4bc1-a2c6-97b5662eda8e" />





---

## 🎯 Why this stands out

* Clear alignment with **Election Process Education**
* **Accessible UX** (multi-language, simple explanations)
* **Robust for demo** (fallbacks, no crashes)
* Clean, minimal, **deployable architecture**

---

## 👨‍💻 Author

Aniket Rachalwar
GitHub: https://github.com/aniketrachalwar

