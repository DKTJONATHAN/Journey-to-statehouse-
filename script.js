const levels = {
  easy: [
    {
      type: "multiple",
      question: "When was Kenya's current constitution promulgated?",
      options: ["2005", "2010", "2015", "2020"],
      correct: 1,
      explanation: "The 2010 Constitution was promulgated on August 27, 2010.",
      timer: null
    },
    {
      type: "fill",
      question: "Kenya gained independence in the year _____.",
      answer: "1963",
      explanation: "Kenya became independent on December 12, 1963.",
      timer: null
    },
    {
      type: "multiple",
      question: "Which article establishes the presidency?",
      options: ["Article 130", "Article 131", "Article 132", "Article 133"],
      correct: 1,
      explanation: "Article 131 establishes the office of the President.",
      timer: 20
    },
    {
      type: "fill",
      question: "The first Prime Minister of Kenya was _____.",
      answer: "Jomo Kenyatta",
      explanation: "Jomo Kenyatta served as Prime Minister from 1963-1964 before becoming President.",
      timer: null
    },
    {
      type: "multiple",
      question: "How many counties does Kenya have?",
      options: ["42", "45", "47", "50"],
      correct: 2,
      explanation: "Kenya has 47 counties established under the 2010 Constitution.",
      timer: 15
    },
    {
      type: "multiple",
      question: "Which document preceded the 2010 Constitution?",
      options: ["Lancaster Constitution", "Bomas Draft", "Wako Draft", "Independence Constitution"],
      correct: 3,
      explanation: "The Independence Constitution of 1963 was replaced by the 2010 Constitution.",
      timer: null
    },
    {
      type: "fill",
      question: "The _____ Commission drafted the 2010 Constitution.",
      answer: "Committee of Experts",
      explanation: "The Committee of Experts (CoE) was established to draft the constitution.",
      timer: 25
    },
    {
      type: "multiple",
      question: "Which body interprets the Constitution?",
      options: ["Parliament", "Judiciary", "Executive", "County Assemblies"],
      correct: 1,
      explanation: "The Judiciary is established under Chapter 10 as the interpreter of the Constitution.",
      timer: null
    },
    {
      type: "fill",
      question: "The national motto of Kenya is '_____'.",
      answer: "Harambee",
      explanation: "Harambee means 'pulling together' in Swahili.",
      timer: null
    },
    {
      type: "multiple",
      question: "Which article establishes the Senate?",
      options: ["Article 93", "Article 96", "Article 98", "Article 100"],
      correct: 0,
      explanation: "Article 93 establishes both Houses of Parliament.",
      timer: 20
    },
    {
      type: "multiple",
      question: "Who was Kenya's first female MP?",
      options: ["Grace Onyango", "Wangari Maathai", "Julia Ojiambo", "Phoebe Asiyo"],
      correct: 0,
      explanation: "Grace Onyango became the first female MP in 1969.",
      timer: 15
    },
    {
      type: "fill",
      question: "The _____ case established judicial review in Kenya.",
      answer: "Marbury v Madison",
      explanation: "While American, this precedent influenced Kenya's judicial review principles.",
      timer: null
    },
    {
      type: "multiple",
      question: "Which year did Kenya become a one-party state?",
      options: ["1964", "1966", "1969", "1982"],
      correct: 3,
      explanation: "Kenya became a de jure one-party state in 1982.",
      timer: 25
    },
    {
      type: "fill",
      question: "The _____ Rebellion was a major anti-colonial uprising.",
      answer: "Mau Mau",
      explanation: "The Mau Mau Uprising occurred from 1952-1960.",
      timer: null
    },
    {
      type: "multiple",
      question: "Which article establishes the Bill of Rights?",
      options: ["Chapter 2", "Chapter 4", "Chapter 6", "Chapter 9"],
      correct: 1,
      explanation: "Chapter 4 contains the comprehensive Bill of Rights.",
      timer: 20
    }
  ],
  medium: [
    {
      type: "multiple",
      question: "Who was the first Chief Justice under the 2010 Constitution?",
      options: ["Evan Gicheru", "Willy Mutunga", "David Maraga", "Bernard Chunga"],
      correct: 1,
      explanation: "Dr. Willy Mutunga was the first CJ under the new constitution.",
      timer: 20
    },
    // 14 more medium questions...
    {
      type: "fill",
      question: "The _____ system was introduced under the 2010 Constitution.",
      answer: "devolved",
      explanation: "Devolution created county governments under Chapter 11.",
      timer: null
    }
  ],
  hard: [
    {
      type: "multiple",
      question: "Which case established the basic structure doctrine in Kenya?",
      options: ["Njoya case", "Mutunga case", "Ouko case", "Wako case"],
      correct: 0,
      explanation: "Njoya v Attorney General (2004) established basic structure principles.",
      timer: 30
    },
    // 14 more hard questions...
    {
      type: "fill",
      question: "The _____ Amendment introduced the position of Prime Minister in 2008.",
      answer: "Constitution of Kenya (Amendment)",
      explanation: "This temporary amendment created the PM position after the 2007-08 crisis.",
      timer: 25
    }
  ]
};

// Enhanced Game Mechanics
const gameConfig = {
  maxAttempts: 3,
  timers: {
    easy: 20,
    medium: 15,
    hard: 30
  },
  scoring: {
    basePoints: 10,
    timeBonus: 5,
    levelBonus: {
      easy: 0,
      medium: 50,
      hard: 100
    }
  }
};

// Game State Management
let gameState = {
  currentLevel: 'easy',
  currentQuestion: 0,
  attempts: 0,
  score: 0,
  completedQuestions: [],
  timeLeft: 0,
  timerInterval: null
};

// Timer System
function startTimer(seconds) {
  gameState.timeLeft = seconds;
  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--;
    updateTimerDisplay();
    
    if (gameState.timeLeft <= 0) {
      handleTimeExpired();
    }
  }, 1000);
}

function handleTimeExpired() {
  clearInterval(gameState.timerInterval);
  const currentQ = levels[gameState.currentLevel][gameState.currentQuestion];
  showFeedback(`Time's up! The correct answer was: ${currentQ.type === 'multiple' ? currentQ.options[currentQ.correct] : currentQ.answer}`);
  lockQuestion();
}

// Progression Rules
function checkAnswer(userAnswer) {
  const question = levels[gameState.currentLevel][gameState.currentQuestion];
  let isCorrect = false;
  
  if (question.type === 'multiple') {
    isCorrect = (userAnswer === question.correct);
  } else {
    isCorrect = (userAnswer.toLowerCase() === question.answer.toLowerCase());
  }

  if (isCorrect) {
    handleCorrectAnswer();
  } else {
    handleIncorrectAnswer();
  }
}

function handleCorrectAnswer() {
  clearInterval(gameState.timerInterval);
  const timeBonus = gameState.timeLeft > 0 ? Math.floor(gameState.timeLeft * 0.5) : 0;
  gameState.score += gameConfig.scoring.basePoints + timeBonus;
  
  // Mark question as completed
  gameState.completedQuestions.push({
    level: gameState.currentLevel,
    index: gameState.currentQuestion,
    attempts: gameState.attempts + 1
  });
  
  // Move to next question or level
  advanceToNext();
}

function handleIncorrectAnswer() {
  gameState.attempts++;
  
  if (gameState.attempts >= gameConfig.maxAttempts) {
    clearInterval(gameState.timerInterval);
    const currentQ = levels[gameState.currentLevel][gameState.currentQuestion];
    showFeedback(`Maximum attempts reached. Correct answer: ${currentQ.type === 'multiple' ? currentQ.options[currentQ.correct] : currentQ.answer}`);
    lockQuestion();
  } else {
    showFeedback("Incorrect. Try again!");
  }
}

function advanceToNext() {
  gameState.currentQuestion++;
  
  if (gameState.currentQuestion >= levels[gameState.currentLevel].length) {
    // Level completed
    gameState.score += gameConfig.scoring.levelBonus[gameState.currentLevel];
    
    if (gameState.currentLevel === 'easy') {
      gameState.currentLevel = 'medium';
    } else if (gameState.currentLevel === 'medium') {
      gameState.currentLevel = 'hard';
    } else {
      endGame();
      return;
    }
    
    gameState.currentQuestion = 0;
  }
  
  resetForNewQuestion();
}

// Helper functions
function resetForNewQuestion() {
  gameState.attempts = 0;
  const question = levels[gameState.currentLevel][gameState.currentQuestion];
  
  if (question.timer) {
    startTimer(question.timer);
  }
  
  renderQuestion();
}

function lockQuestion() {
  // Disable input and show continue button
  // Player must acknowledge before proceeding
}