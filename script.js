// Game levels
const levels = {
  easy: [
    {
      type: "multiple",
      obstacle: "The Constitutional Challenge",
      question: "According to the Constitution of Kenya 2010, what is the maximum number of terms a President can serve?",
      options: ["1 term", "2 terms", "3 terms", "Unlimited terms"],
      correct: 1,
      explanation: "The Constitution limits the President to a maximum of 2 terms of 5 years each."
    },
    {
      type: "fill",
      obstacle: "The Independence Test",
      question: "In what year did Kenya gain independence from Britain?",
      answer: "1963",
      explanation: "Kenya gained independence on December 12, 1963, under the leadership of Jomo Kenyatta."
    }
  ],
  medium: [
    {
      type: "multiple",
      obstacle: "Chapter 4 Challenge",
      question: "Which article of the Constitution guarantees the right to freedom of expression?",
      options: ["Article 19", "Article 33", "Article 55", "Article 24"],
      correct: 1,
      explanation: "Article 33 guarantees freedom of expression, including press freedom and academic freedom."
    },
    {
      type: "multiple",
      obstacle: "Devolution Test",
      question: "Which is NOT a function of county governments under the Constitution?",
      options: ["Agriculture", "Foreign affairs", "County health services", "Cultural activities"],
      correct: 1,
      explanation: "Foreign affairs is a national government function (Fourth Schedule)"
    }
  ],
  hard: [
    {
      type: "fill",
      obstacle: "Constitutional Expert",
      question: "Which article establishes the principle that not more than two-thirds of elective public bodies shall be of the same gender?",
      answer: "Article 81",
      explanation: "Article 81(b) establishes the gender representation principle."
    },
    {
      type: "multiple",
      obstacle: "Supreme Law",
      question: "Under Article 2, what happens to any law that contradicts the Constitution?",
      options: [
        "It's valid if passed by Parliament",
        "It's null and void to the extent of inconsistency",
        "It requires presidential assent",
        "It goes to referendum"
      ],
      correct: 1,
      explanation: "Article 2(4) states such laws are invalid to the extent of inconsistency."
    }
  ],
  voterEducation: [
    {
      type: "multiple",
      question: "What is the minimum age for voter registration in Kenya?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correct: 1,
      explanation: "You must be 18+ to register as a voter (Article 83)"
    },
    {
      type: "multiple",
      question: "Where can you register to vote?",
      options: [
        "Only at IEBC headquarters",
        "At any Huduma Centre",
        "At designated registration centers",
        "Online through IEBC portal"
      ],
      correct: 2,
      explanation: "Registration happens at IEBC-designated centers during registration periods"
    }
  ]
};

// Game state
let gameState = {
  level: 'easy',
  questionIndex: 0,
  score: 0,
  registeredVoter: null,
  completedLevels: []
};

// Timer for hard level
let timer = {
  timeLeft: 30,
  interval: null
};

// DOM elements
const elements = {
  startScreen: document.getElementById('startScreen'),
  questionScreen: document.getElementById('questionScreen'),
  votingScreen: document.getElementById('votingScreen'),
  victoryScreen: document.getElementById('victoryScreen'),
  voterRegistrationScreen: document.getElementById('voterRegistrationScreen'),
  registrationInfo: document.getElementById('registrationInfo'),
  proceedToVote: document.getElementById('proceedToVote'),
  progressBar: document.getElementById('progressBar'),
  levelText: document.getElementById('levelText'),
  obstacleWarning: document.getElementById('obstacleWarning'),
  questionText: document.getElementById('questionText'),
  optionsContainer: document.getElementById('optionsContainer'),
  inputAnswer: document.getElementById('inputAnswer'),
  submitAnswer: document.getElementById('submitAnswer'),
  feedback: document.getElementById('feedback'),
  nextButton: document.getElementById('nextButton'),
  timerDisplay: document.getElementById('timer')
};

// Initialize game
function initGame() {
  // Set up event listeners
  document.querySelector('.btn-primary').addEventListener('click', startGame);
  document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
  document.getElementById('nextButton').addEventListener('click', nextQuestion);
  
  // Hide all screens except start
  Object.values(elements).forEach(el => {
    if (el && el.classList) el.classList.add('hidden');
  });
  elements.startScreen.classList.remove('hidden');
}

// Start game
function startGame() {
  gameState = {
    level: 'easy',
    questionIndex: 0,
    score: 0,
    registeredVoter: null,
    completedLevels: []
  };
  
  elements.startScreen.classList.add('hidden');
  elements.questionScreen.classList.remove('hidden');
  showQuestion();
}

// Show current question
function showQuestion() {
  const question = levels[gameState.level][gameState.questionIndex];
  const progressPercent = ((gameState.questionIndex + 1) / levels[gameState.level].length) * 100;
  
  elements.progressBar.style.width = `${progressPercent}%`;
  elements.levelText.textContent = `${gameState.level.toUpperCase()} Level - Question ${gameState.questionIndex + 1} of ${levels[gameState.level].length}`;
  elements.obstacleWarning.textContent = `⚠️ Obstacle: ${question.obstacle || 'Voter Preparation'}`;
  elements.questionText.textContent = question.question;
  
  // Clear previous feedback
  elements.feedback.classList.add('hidden');
  elements.nextButton.classList.add('hidden');
  
  if (question.type === "multiple") {
    showMultipleChoice(question);
  } else {
    showFillAnswer(question);
  }
  
  // Start timer for hard level
  if (gameState.level === 'hard') {
    startHardLevel();
  }
}

// Show multiple choice question
function showMultipleChoice(question) {
  elements.optionsContainer.classList.remove('hidden');
  elements.inputAnswer.classList.add('hidden');
  elements.submitAnswer.classList.add('hidden');
  
  elements.optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.textContent = option;
    optionDiv.onclick = () => selectOption(index);
    elements.optionsContainer.appendChild(optionDiv);
  });
}

// Show fill-in answer question
function showFillAnswer(question) {
  elements.optionsContainer.classList.add('hidden');
  elements.inputAnswer.classList.remove('hidden');
  elements.submitAnswer.classList.remove('hidden');
  
  elements.inputAnswer.value = '';
  elements.inputAnswer.focus();
}

// Select option for multiple choice
function selectOption(selectedIndex) {
  const question = levels[gameState.level][gameState.questionIndex];
  const options = document.querySelectorAll('.option');
  
  options.forEach((option, index) => {
    option.classList.remove('correct', 'incorrect');
    if (index === question.correct) {
      option.classList.add('correct');
    } else if (index === selectedIndex && index !== question.correct) {
      option.classList.add('incorrect');
    }
  });
  
  elements.feedback.textContent = question.explanation;
  
  if (selectedIndex === question.correct) {
    elements.feedback.classList.add('correct');
    gameState.score++;
  } else {
    elements.feedback.classList.add('incorrect');
  }
  
  elements.feedback.classList.remove('hidden');
  elements.nextButton.classList.remove('hidden');
  
  // Stop timer if hard level
  if (gameState.level === 'hard') {
    clearInterval(timer.interval);
  }
}

// Check answer for fill-in questions
function checkAnswer() {
  const question = levels[gameState.level][gameState.questionIndex];
  const userAnswer = elements.inputAnswer.value.trim();
  
  elements.feedback.textContent = question.explanation;
  
  if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
    elements.feedback.classList.add('correct');
    elements.feedback.textContent = "Correct! " + question.explanation;
    gameState.score++;
  } else {
    elements.feedback.classList.add('incorrect');
    elements.feedback.textContent = `Incorrect. The correct answer is: ${question.answer}. ${question.explanation}`;
  }
  
  elements.feedback.classList.remove('hidden');
  elements.nextButton.classList.remove('hidden');
  
  // Stop timer if hard level
  if (gameState.level === 'hard') {
    clearInterval(timer.interval);
  }
}

// Move to next question or level
function nextQuestion() {
  gameState.questionIndex++;
  
  if (gameState.questionIndex >= levels[gameState.level].length) {
    gameState.completedLevels.push(gameState.level);
    
    if (gameState.level === 'easy') {
      gameState.level = 'medium';
    } else if (gameState.level === 'medium') {
      gameState.level = 'hard';
    } else if (gameState.level === 'hard') {
      gameState.level = 'voterEducation';
    } else {
      showRegistrationCheck();
      return;
    }
    
    gameState.questionIndex = 0;
    
    // Reset timer for hard level
    if (gameState.level === 'hard') {
      timer.timeLeft = 30;
      elements.timerDisplay.textContent = timer.timeLeft;
    }
  }
  
  showQuestion();
}

// Start timer for hard level
function startHardLevel() {
  elements.timerDisplay.textContent = timer.timeLeft;
  elements.timerDisplay.parentElement.classList.remove('hidden');
  
  timer.interval = setInterval(() => {
    timer.timeLeft--;
    elements.timerDisplay.textContent = timer.timeLeft;
    
    if (timer.timeLeft <= 0) {
      timeUp();
    }
  }, 1000);
}

// Handle time up
function timeUp() {
  clearInterval(timer.interval);
  const question = levels[gameState.level][gameState.questionIndex];
  
  elements.feedback.textContent = `Time's up! ${question.explanation}`;
  elements.feedback.classList.add('incorrect');
  elements.feedback.classList.remove('hidden');
  elements.nextButton.classList.remove('hidden');
}

// Show registration check
function showRegistrationCheck() {
  elements.questionScreen.classList.add('hidden');
  elements.voterRegistrationScreen.classList.remove('hidden');
}

// Check registration status
function checkRegistration(isRegistered) {
  gameState.registeredVoter = isRegistered;
  
  if (isRegistered) {
    elements.voterRegistrationScreen.classList.add('hidden');
    elements.votingScreen.classList.remove('hidden');
  } else {
    elements.registrationInfo.classList.remove('hidden');
    elements.proceedToVote.classList.remove('hidden');
  }
}

// Proceed to vote after registration info
function proceedToVote() {
  elements.voterRegistrationScreen.classList.add('hidden');
  elements.votingScreen.classList.remove('hidden');
}

// Handle voting choice
function vote(choice) {
  elements.votingScreen.classList.add('hidden');
  const totalQuestions = Object.values(levels).reduce((sum, level) => sum + level.length, 0);
  
  elements.victoryMessage.innerHTML = `
    <p>You scored ${gameState.score} out of ${totalQuestions}!</p>
    ${choice === 'good' ? 
      "🇰🇪 Your choice shows commitment to good governance! Kenya needs informed citizens like you." : 
      "⚠️ Your choice maintains the status quo. Stay engaged with civic processes to see change."}
    <p>Remember to participate in actual elections and hold leaders accountable.</p>
  `;
  
  elements.victoryScreen.classList.remove('hidden');
}

// Restart game
function restartGame() {
  elements.victoryScreen.classList.add('hidden');
  elements.startScreen.classList.remove('hidden');
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);