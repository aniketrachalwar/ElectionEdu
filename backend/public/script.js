document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Hardcoded Quiz Questions
    const quizzes = [
        {
            topicKeywords: ["registration", "register", "18", "voter id"],
            question: "Who can vote in India?",
            options: [
                { text: "Any person living in India", isCorrect: false },
                { text: "Only citizens above 18 years", isCorrect: true },
                { text: "Only politicians", isCorrect: false }
            ]
        },
        {
            topicKeywords: ["voting", "evm", "booth", "button"],
            question: "What is used to cast a vote electronically?",
            options: [
                { text: "Mobile Phone", isCorrect: false },
                { text: "EVM (Electronic Voting Machine)", isCorrect: true },
                { text: "ATM Machine", isCorrect: false }
            ]
        },
        {
            topicKeywords: ["counting", "results", "wins", "winner"],
            question: "Who wins the election in a constituency?",
            options: [
                { text: "The candidate with the most votes", isCorrect: true },
                { text: "The oldest candidate", isCorrect: false },
                { text: "The richest candidate", isCorrect: false }
            ]
        }
    ];

    let shownQuizzes = [];

    // Add initial greeting from AI
    addMessage('ai', 'Welcome to ElectionEdu! 👋 I can teach you the Indian election process step-by-step. Which language are you most comfortable with?');

    // Function to handle sending a message
    async function handleSend() {
        const text = userInput.value.trim();
        
        // Prevent empty input submission
        if (!text) return;

        // 1. Show User Message
        addMessage('user', text);
        
        // 2. Clear input & disable button
        userInput.value = '';
        sendBtn.disabled = true;
        userInput.disabled = true;

        // 3. Show "AI is typing..."
        const loadingId = addMessage('ai', 'AI is thinking...', true);

        try {
            // 4. Send request to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error('Server returned an error');
            }

            const data = await response.json();
            
            // 5. Remove loading & show AI response
            removeMessage(loadingId);
            addMessage('ai', data.reply);
            
            // 6. Check if we should trigger a quiz
            triggerQuiz(data.reply);
            
        } catch (error) {
            // Error Handling: If backend fails
            console.error('Chat error:', error);
            removeMessage(loadingId);
            addMessage('ai', '⚠️ AI is currently busy. Please try again in a few seconds.');
        } finally {
            // Re-enable inputs
            sendBtn.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }

    // Helper: Trigger quiz based on AI response keywords
    function triggerQuiz(aiResponse) {
        const lowerResponse = aiResponse.toLowerCase();
        
        for (let i = 0; i < quizzes.length; i++) {
            const quiz = quizzes[i];
            
            // If we haven't shown this quiz yet, and the AI talked about this topic
            if (!shownQuizzes.includes(i) && quiz.topicKeywords.some(kw => lowerResponse.includes(kw))) {
                
                // Show quiz after a short delay
                setTimeout(() => {
                    renderQuiz(quiz, i);
                }, 1000);
                
                shownQuizzes.push(i);
                break; // Only show one quiz at a time
            }
        }
    }

    // Helper: Render quiz UI in chat box
    function renderQuiz(quiz, quizIndex) {
        const quizDiv = document.createElement('div');
        quizDiv.classList.add('message', 'ai', 'quiz-card');
        
        let html = `<strong>Quiz Time! 🧠</strong><br><p>${quiz.question}</p><div class="quiz-options">`;
        
        quiz.options.forEach((opt, idx) => {
            html += `<button class="quiz-btn" data-quiz="${quizIndex}" data-opt="${idx}">${opt.text}</button>`;
        });
        
        html += `</div><div class="quiz-feedback" id="feedback-${quizIndex}"></div>`;
        
        quizDiv.innerHTML = html;
        chatBox.appendChild(quizDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Add click listeners to the new buttons
        const btns = quizDiv.querySelectorAll('.quiz-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                const qIdx = this.getAttribute('data-quiz');
                const oIdx = this.getAttribute('data-opt');
                handleQuizAnswer(qIdx, oIdx, quizDiv, btns);
            });
        });
    }

    // Helper: Handle quiz answer selection
    function handleQuizAnswer(quizIndex, optionIndex, quizDiv, allBtns) {
        const quiz = quizzes[quizIndex];
        const selectedOption = quiz.options[optionIndex];
        const feedbackDiv = document.getElementById(`feedback-${quizIndex}`);
        
        // Disable all buttons so user can't click again
        allBtns.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'default';
        });

        if (selectedOption.isCorrect) {
            feedbackDiv.innerHTML = `<span style="color: #10b981; font-weight: bold;">Correct ✅</span>`;
        } else {
            // Find correct answer text
            const correctOpt = quiz.options.find(o => o.isCorrect).text;
            feedbackDiv.innerHTML = `<span style="color: #ef4444; font-weight: bold;">Wrong ❌</span><br><span style="font-size: 0.85em;">Correct answer: ${correctOpt}</span>`;
        }
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Helper: Add message to chat box
    function addMessage(sender, text, isLoading = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        
        if (isLoading) {
            msgDiv.classList.add('loading');
        }

        // Extremely simple bold parsing for *bold* text
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');
        
        msgDiv.innerHTML = formattedText;
        
        // Generate a unique ID for loading messages so we can remove them later
        const id = 'msg-' + Date.now();
        msgDiv.id = id;

        chatBox.appendChild(msgDiv);
        
        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
        
        return id;
    }

    // Helper: Remove message by ID
    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
