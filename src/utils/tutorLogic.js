const steps = [
  {
    id: 0,
    text: "Welcome to **ElectionEdu**! 👋 I'm your Election Assistant. I'm going to teach you how elections work in India, just like we're studying for Civics class.\n\nElections are how we, the citizens, pick the leaders who make decisions for our country.\n\nShall we start with Step 1: Voter Registration?",
  },
  {
    id: 1,
    text: "### Step 1: Voter Registration 📝\n\nBefore voting, you must register. In India, if you are an Indian citizen and 18 years old, you can apply. Your name gets added to a list called the 'Voter List' (Electoral Roll), and you get a Voter ID card (EPIC).\n\n*Think of it like getting a hall ticket before writing your board exams!*\n\nDo you have any questions about this, or are you ready for the next step?",
  },
  {
    id: 2,
    text: "### Step 2: Campaigning 📢\n\nNow, candidates go to the public to ask for votes. They hold rallies, give speeches, and hand out 'Manifestos'—a list of promises they will keep if they win (like promising better roads or schools).\n\n*This is similar to you telling your classmates why they should vote for you as monitor.*\n\nGot questions about campaigning, or are you ready for the next step?",
  },
  {
    id: 3,
    text: "### Step 3: Voting Day 🗳️\n\nOn Election Day, registered voters go to a polling booth. In India, we use a machine called an EVM (Electronic Voting Machine). You press a button next to your chosen candidate's symbol. It's totally secret!\n\n*It's like an MCQs test where nobody sees your answer sheet.*\n\nAny questions on EVMs or voting day, or should we go to the next step?",
  },
  {
    id: 4,
    text: "### Step 4: Vote Counting 🧮\n\nAfter everyone votes, the EVMs are sealed and kept safely. On a fixed day, officials count the votes inside the EVMs while candidates' agents watch to ensure everything is fair.\n\n*This is like teachers checking the exam papers carefully in the staff room.*\n\nDo you want to ask anything, or are you ready for the final step?",
  },
  {
    id: 5,
    text: "### Step 5: Results 🏆\n\nOnce counting finishes, the Election Commission announces the winner. In India's system, the candidate who gets the most votes in their area wins!\n\n*Just like the student with the highest marks ranks first.*\n\nYou've finished the election process! Do you have any questions about what we learned?",
  }
];

export const getInitialMessage = () => steps[0].text;

export const getNextStepMessage = (currentStepIndex) => {
  if (currentStepIndex + 1 < steps.length) {
    return steps[currentStepIndex + 1].text;
  }
  return "You have completed all the steps! Feel free to ask any questions about the Indian election process.";
};

export const handleUserMessage = (message, currentStepIndex) => {
  const lowerMsg = message.toLowerCase();
  
  // Keyword-based Q&A
  if (lowerMsg.includes("age") || lowerMsg.includes("how old")) {
    return "In India, you must be exactly 18 years or older on January 1st of the election year to register to vote.\n\nReady to move to the next step?";
  }
  if (lowerMsg.includes("evm") || lowerMsg.includes("machine")) {
    return "EVM stands for Electronic Voting Machine. Instead of paper, you press a button next to a party symbol. It records votes electronically, which is faster and saves paper.\n\nShall we continue?";
  }
  if (lowerMsg.includes("manifesto") || lowerMsg.includes("promise")) {
    return "A manifesto is a booklet published by a political party. It lists all the things they promise to do for the public if they win the election.\n\nAre you ready for the next step?";
  }
  if (lowerMsg.includes("who wins") || lowerMsg.includes("tie")) {
    return "In India, we follow the 'First-Past-The-Post' system. Whoever gets the highest number of votes in their constituency (area) wins. They don't need a majority (50%), just the most votes.\n\nShall we move on?";
  }
  
  // Progression logic (yes, ready, next, etc.)
  if (
    lowerMsg.includes("yes") || 
    lowerMsg.includes("ready") || 
    lowerMsg.includes("next") || 
    lowerMsg.includes("go on") ||
    lowerMsg.includes("sure") ||
    lowerMsg.includes("ok")
  ) {
    if (currentStepIndex < steps.length - 1) {
      return { type: 'NEXT_STEP' };
    } else {
      return "You've finished the curriculum! You can ask any specific questions you have about Indian elections.";
    }
  }

  // Fallback
  return "That's an interesting question! Elections are a big topic. Let's focus on our current step though. If you don't have questions about it, just say 'next' to continue.";
};
