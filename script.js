// Game levels with all 45 questions (15 per level)
const levels = {
  easy: [
    {
      type: "multiple",
      obstacle: "Constitutional Basics",
      question: "When was Kenya's current constitution promulgated?",
      options: ["2005", "2010", "2015", "2020"],
      correct: 1,
      explanation: "The 2010 Constitution was promulgated on August 27, 2010.",
      timer: null,
      reference: "Constitution of Kenya (2010) Preamble"
    },
    {
      type: "fill",
      obstacle: "Historical Knowledge",
      question: "Kenya gained independence in the year _____.",
      answer: "1963",
      explanation: "Kenya became independent on December 12, 1963.",
      timer: null,
      reference: "Kenya Independence Act 1963"
    },
    {
      type: "multiple",
      obstacle: "Presidential Powers",
      question: "Which article establishes the presidency?",
      options: ["Article 130", "Article 131", "Article 132", "Article 133"],
      correct: 1,
      explanation: "Article 131 establishes the office of the President.",
      timer: 20,
      reference: "Constitution of Kenya, Article 131"
    },
    {
      type: "fill",
      obstacle: "Historical Leaders",
      question: "The first Prime Minister of Kenya was _____.",
      answer: "Jomo Kenyatta",
      explanation: "Jomo Kenyatta served as Prime Minister from 1963-1964 before becoming President.",
      timer: null,
      reference: "Kenya Independence Constitution 1963"
    },
    {
      type: "multiple",
      obstacle: "Devolution",
      question: "How many counties does Kenya have?",
      options: ["42", "45", "47", "50"],
      correct: 2,
      explanation: "Kenya has 47 counties established under the 2010 Constitution.",
      timer: 15,
      reference: "Constitution of Kenya, Article 6(1)"
    },
    {
      type: "multiple",
      obstacle: "Constitutional History",
      question: "Which document preceded the 2010 Constitution?",
      options: ["Lancaster Constitution", "Bomas Draft", "Wako Draft", "Independence Constitution"],
      correct: 3,
      explanation: "The Independence Constitution of 1963 was replaced by the 2010 Constitution.",
      timer: null,
      reference: "Constitutional History of Kenya"
    },
    {
      type: "fill",
      obstacle: "Constitutional Process",
      question: "The _____ Commission drafted the 2010 Constitution.",
      answer: "Committee of Experts",
      explanation: "The Committee of Experts (CoE) was established to draft the constitution.",
      timer: 20,
      reference: "Constitution of Kenya Review Act 2008"
    },
    {
      type: "multiple",
      obstacle: "Government Structure",
      question: "Which body interprets the Constitution?",
      options: ["Parliament", "Judiciary", "Executive", "County Assemblies"],
      correct: 1,
      explanation: "The Judiciary is established under Chapter 10 as the interpreter of the Constitution.",
      timer: null,
      reference: "Constitution of Kenya, Article 159"
    },
    {
      type: "fill",
      obstacle: "National Symbols",
      question: "The national motto of Kenya is '_____'.",
      answer: "Harambee",
      explanation: "Harambee means 'pulling together' in Swahili.",
      timer: null,
      reference: "National Symbols Act"
    },
    {
      type: "multiple",
      obstacle: "Legislature",
      question: "Which article establishes the Senate?",
      options: ["Article 93", "Article 96", "Article 98", "Article 100"],
      correct: 0,
      explanation: "Article 93 establishes both Houses of Parliament.",
      timer: 20,
      reference: "Constitution of Kenya, Article 93"
    },
    {
      type: "multiple",
      obstacle: "Political History",
      question: "Who was Kenya's first female MP?",
      options: ["Grace Onyango", "Wangari Maathai", "Julia Ojiambo", "Phoebe Asiyo"],
      correct: 0,
      explanation: "Grace Onyango became the first female MP in 1969.",
      timer: 15,
      reference: "Parliamentary History of Kenya"
    },
    {
      type: "fill",
      obstacle: "Legal Precedents",
      question: "The _____ case established judicial review in Kenya.",
      answer: "Marbury v Madison",
      explanation: "While American, this precedent influenced Kenya's judicial review principles.",
      timer: null,
      reference: "Judicial Precedents"
    },
    {
      type: "multiple",
      obstacle: "Political Systems",
      question: "Which year did Kenya become a one-party state?",
      options: ["1964", "1966", "1969", "1982"],
      correct: 3,
      explanation: "Kenya became a de jure one-party state in 1982.",
      timer: 25,
      reference: "Constitution of Kenya (Amendment) Act 1982"
    },
    {
      type: "fill",
      obstacle: "Colonial History",
      question: "The _____ Rebellion was a major anti-colonial uprising.",
      answer: "Mau Mau",
      explanation: "The Mau Mau Uprising occurred from 1952-1960.",
      timer: null,
      reference: "Kenyan Colonial History"
    },
    {
      type: "multiple",
      obstacle: "Rights and Freedoms",
      question: "Which article establishes the Bill of Rights?",
      options: ["Chapter 2", "Chapter 4", "Chapter 6", "Chapter 9"],
      correct: 1,
      explanation: "Chapter 4 contains the comprehensive Bill of Rights.",
      timer: 20,
      reference: "Constitution of Kenya, Chapter 4"
    }
  ],
  medium: [
    {
      type: "multiple",
      obstacle: "Judicial System",
      question: "Who was the first Chief Justice under the 2010 Constitution?",
      options: ["Evan Gicheru", "Willy Mutunga", "David Maraga", "Bernard Chunga"],
      correct: 1,
      explanation: "Dr. Willy Mutunga was the first CJ under the new constitution.",
      timer: 20,
      reference: "Judiciary Transformation Framework"
    },
    {
      type: "fill",
      obstacle: "Devolution",
      question: "The _____ system was introduced under the 2010 Constitution.",
      answer: "devolved",
      explanation: "Devolution created county governments under Chapter 11.",
      timer: null,
      reference: "Constitution of Kenya, Chapter 11"
    },
    {
      type: "multiple",
      obstacle: "Government Structure",
      question: "Which commission is responsible for implementing devolution?",
      options: ["CIC", "CRA", "IEBC", "PSC"],
      correct: 1,
      explanation: "The Commission on Revenue Allocation (CRA) oversees devolution funds.",
      timer: 15,
      reference: "Constitution of Kenya, Article 215"
    },
    {
      type: "fill",
      obstacle: "Constitutional Amendments",
      question: "The _____ Amendment introduced the position of Prime Minister in 2008.",
      answer: "Constitution of Kenya (Amendment)",
      explanation: "This temporary amendment created the PM position after the 2007-08 crisis.",
      timer: 25,
      reference: "National Accord and Reconciliation Act 2008"
    },
    {
      type: "multiple",
      obstacle: "Judicial System",
      question: "What is the retirement age for Supreme Court judges?",
      options: ["65 years", "70 years", "75 years", "No mandatory retirement"],
      correct: 1,
      explanation: "Article 167(1) sets retirement at 70 years for Supreme Court judges.",
      timer: null,
      reference: "Constitution of Kenya, Article 167(1)"
    },
    {
      type: "multiple",
      obstacle: "Security Organs",
      question: "Which article establishes the National Police Service?",
      options: ["Article 243", "Article 245", "Article 249", "Article 252"],
      correct: 0,
      explanation: "Article 243 establishes the National Police Service.",
      timer: 20,
      reference: "Constitution of Kenya, Article 243"
    },
    {
      type: "fill",
      obstacle: "Legal Doctrine",
      question: "The _____ case established the basic structure doctrine in Kenya.",
      answer: "Njoya",
      explanation: "Njoya v Attorney General (2004) established basic structure principles.",
      timer: 30,
      reference: "Njoya v Attorney General [2004]"
    },
    {
      type: "multiple",
      obstacle: "Government Structure",
      question: "Which is NOT a national security organ?",
      options: ["Kenya Defence Forces", "National Intelligence Service", "National Police Service", "Ethics and Anti-Corruption Commission"],
      correct: 3,
      explanation: "EACC is not listed as a national security organ under Article 239.",
      timer: null,
      reference: "Constitution of Kenya, Article 239"
    },
    {
      type: "fill",
      obstacle: "Constitutional Implementation",
      question: "The _____ Commission oversees implementation of the Constitution.",
      answer: "Constitution Implementation",
      explanation: "The CIC was established to oversee implementation of the new constitution.",
      timer: 20,
      reference: "Constitution of Kenya, Sixth Schedule"
    },
    {
      type: "multiple",
      obstacle: "Electoral System",
      question: "Which article establishes the Independent Electoral and Boundaries Commission?",
      options: ["Article 88", "Article 89", "Article 90", "Article 91"],
      correct: 0,
      explanation: "Article 88 establishes the IEBC.",
      timer: 15,
      reference: "Constitution of Kenya, Article 88"
    },
    {
      type: "multiple",
      obstacle: "Voting Rights",
      question: "What is the minimum voting age in Kenya?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correct: 1,
      explanation: "Article 83 establishes 18 years as the minimum voting age.",
      timer: null,
      reference: "Constitution of Kenya, Article 83"
    },
    {
      type: "fill",
      obstacle: "Gender Rights",
      question: "The _____ system ensures no more than 2/3 of any gender in elective bodies.",
      answer: "gender rule",
      explanation: "Article 81(b) establishes the gender representation principle.",
      timer: 25,
      reference: "Constitution of Kenya, Article 81(b)"
    },
    {
      type: "multiple",
      obstacle: "Devolution",
      question: "Which is NOT a function of county governments?",
      options: ["Agriculture", "Foreign affairs", "County health services", "Cultural activities"],
      correct: 1,
      explanation: "Foreign affairs is a national government function (Fourth Schedule).",
      timer: 20,
      reference: "Constitution of Kenya, Fourth Schedule"
    },
    {
      type: "fill",
      obstacle: "Public Finance",
      question: "The _____ clause protects constitutionally established funds from arbitrary withdrawal.",
      answer: "protected funds",
      explanation: "Article 206 establishes protected funds that can't be withdrawn without authorization.",
      timer: null,
      reference: "Constitution of Kenya, Article 206"
    },
    {
      type: "multiple",
      obstacle: "Governance Principles",
      question: "Which article establishes the principle of public participation?",
      options: ["Article 1", "Article 10", "Article 35", "Article 201"],
      correct: 1,
      explanation: "Article 10 includes public participation as a national value.",
      timer: 15,
      reference: "Constitution of Kenya, Article 10"
    }
  ],
  hard: [
    {
      type: "multiple",
      obstacle: "Electoral Law",
      question: "Which case established that presidential election petitions must be heard within 14 days?",
      options: ["Raila v IEBC", "Maina Kiai case", "Marbial case", "Njoya case"],
      correct: 1,
      explanation: "Maina Kiai case set the 14-day timeline for presidential petitions.",
      timer: 30,
      reference: "Maina Kiai v IEBC [2017]"
    },
    {
      type: "fill",
      obstacle: "Constitutional Law",
      question: "The _____ doctrine prevents Parliament from amending basic constitutional structures.",
      answer: "basic structure",
      explanation: "Established in Njoya case, limiting parliamentary amendment powers.",
      timer: null,
      reference: "Njoya v Attorney General [2004]"
    },
    {
      type: "multiple",
      obstacle: "Presidential Powers",
      question: "Which article establishes the procedure for removing the President?",
      options: ["Article 144", "Article 145", "Article 146", "Article 147"],
      correct: 1,
      explanation: "Article 145 establishes the impeachment procedure.",
      timer: 25,
      reference: "Constitution of Kenya, Article 145"
    },
    {
      type: "fill",
      obstacle: "Constitutional Law",
      question: "The _____ test is used to determine if a limitation of rights is constitutional.",
      answer: "proportionality",
      explanation: "Article 24 requires limitations to be reasonable and justifiable.",
      timer: 30,
      reference: "Constitution of Kenya, Article 24"
    },
    {
      type: "multiple",
      obstacle: "Electoral Law",
      question: "Which case established the principle that IEBC servers must be open for scrutiny?",
      options: ["Raila 2013", "Raila 2017", "Maina Kiai", "Martha Karua case"],
      correct: 1,
      explanation: "Raila 2017 Supreme Court ruling required server access.",
      timer: null,
      reference: "Raila Odinga v IEBC [2017]"
    },
    {
      type: "multiple",
      obstacle: "Constitutional Amendments",
      question: "Which article establishes the procedure for constitutional amendment by popular initiative?",
      options: ["Article 255", "Article 256", "Article 257", "Article 258"],
      correct: 2,
      explanation: "Article 257 establishes the popular initiative process.",
      timer: 20,
      reference: "Constitution of Kenya, Article 257"
    },
    {
      type: "fill",
      obstacle: "Constitutional Interpretation",
      question: "The _____ clause in Article 259 requires interpreting the Constitution in a manner that promotes its purposes.",
      answer: "purposive",
      explanation: "Article 259 requires a purposive interpretation of the Constitution.",
      timer: 25,
      reference: "Constitution of Kenya, Article 259"
    },
    {
      type: "multiple",
      obstacle: "Electoral Law",
      question: "Which case established that presidential election results must be verifiable?",
      options: ["Raila 2013", "Raila 2017", "Maina Kiai", "Martha Karua 2022"],
      correct: 1,
      explanation: "Raila 2017 Supreme Court ruling established the verifiability principle.",
      timer: 30,
      reference: "Raila Odinga v IEBC [2017]"
    },
    {
      type: "fill",
      obstacle: "International Law",
      question: "The _____ principle requires that constitutional interpretation considers international law.",
      answer: "internationalist",
      explanation: "Article 2(5) incorporates international law into Kenyan law.",
      timer: null,
      reference: "Constitution of Kenya, Article 2(5)"
    },
    {
      type: "multiple",
      obstacle: "Intergovernmental Relations",
      question: "Which article establishes the procedure for resolving conflicts between national and county governments?",
      options: ["Article 187", "Article 189", "Article 191", "Article 193"],
      correct: 2,
      explanation: "Article 191 establishes the conflict resolution mechanism.",
      timer: 25,
      reference: "Constitution of Kenya, Article 191"
    },
    {
      type: "multiple",
      obstacle: "Human Rights",
      question: "Which article establishes the Kenya National Human Rights Commission?",
      options: ["Article 59", "Article 62", "Article 65", "Article 68"],
      correct: 0,
      explanation: "Article 59 establishes the KNHRC.",
      timer: null,
      reference: "Constitution of Kenya, Article 59"
    },
    {
      type: "fill",
      obstacle: "Judicial System",
      question: "The _____ principle requires courts to develop the law in line with the Constitution's spirit.",
      answer: "transformative",
      explanation: "Article 159(2)(e) requires courts to promote the Constitution's purposes.",
      timer: 30,
      reference: "Constitution of Kenya, Article 159(2)(e)"
    },
    {
      type: "multiple",
      obstacle: "Public Finance",
      question: "Which article establishes the Contingencies Fund?",
      options: ["Article 203", "Article 206", "Article 208", "Article 210"],
      correct: 2,
      explanation: "Article 208 establishes the Contingencies Fund.",
      timer: 20,
      reference: "Constitution of Kenya, Article 208"
    },
    {
      type: "fill",
      obstacle: "Electoral System",
      question: "The _____ system allocates parliamentary seats based on population and geographical size.",
      answer: "mixed member",
      explanation: "Article 90 establishes the mixed member system for parliamentary elections.",
      timer: null,
      reference: "Constitution of Kenya, Article 90"
    },
    {
      type: "multiple",
      obstacle: "Constitutional Supremacy",
      question: "Which article declares the Constitution as the supreme law of Kenya?",
      options: ["Article 1", "Article 2", "Article 3", "Article 4"],
      correct: 1,
      explanation: "Article 2 establishes constitutional supremacy.",
      timer: 15,
      reference: "Constitution of Kenya, Article 2"
    }
  ]
};

// Game state
let gameState = {
  level: 'easy',
  questionIndex: 0,
  score: 0,
  registeredVoter: null,
  completedLevels: [],
  attempts: 0
};

// Timer
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
  timerDisplay: document.getElementById('timer'),
  constitutionRef: document.getElementById('constitution-ref'),
  finalScore: document.getElementById('finalScore'),
  victoryTitle: document.getElementById('victoryTitle'),
  victoryMessage: document.getElementById('victoryMessage')
};

// Initialize game
function initGame() {
  document.getElementById('startButton').addEventListener('click', startGame);
  elements.submitAnswer.addEventListener('click', checkAnswer);
  elements.nextButton.addEventListener('click', nextQuestion);

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
    completedLevels: [],
    attempts: 0
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
  elements.obstacleWarning.textContent = `⚠️ Challenge: ${question.obstacle || 'Constitutional Knowledge'}`;
  elements.questionText.textContent = question.question;

  // Clear previous feedback
  elements.feedback.classList.add('hidden');
  elements.nextButton.classList.add('hidden');
  elements.constitutionRef.textContent = question.reference || '';
  
  if (question.reference) {
    elements.constitutionalReference.classList.remove('hidden');
  } else {
    elements.constitutionalReference.classList.add('hidden');
  }

  if (question.type === "multiple") {
    showMultipleChoice(question);
  } else {
    showFillAnswer(question);
  }

  // Start timer if question has one
  if (question.timer) {
    startTimer(question.timer);
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
  const options = document.querySelectorAll('.option');
  options.forEach(option => option.classList.remove('selected'));
  options[selectedIndex].classList.add('selected');
}

// Check answer
function checkAnswer() {
  const question = levels[gameState.level][gameState.questionIndex];
  let isCorrect = false;
  let userAnswer;

  if (question.type === 'multiple') {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
      showFeedback("Please select an answer!");
      return;
    }
    const selectedIndex = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
    isCorrect = (selectedIndex === question.correct);
    userAnswer = selectedIndex;
  } else {
    userAnswer = elements.inputAnswer.value.trim();
    isCorrect = (userAnswer.toLowerCase() === question.answer.toLowerCase());
  }

  if (isCorrect) {
    handleCorrectAnswer(question);
  } else {
    handleIncorrectAnswer(question);
  }
}

function handleCorrectAnswer(question) {
  clearInterval(timer.interval);
  gameState.score++;
  gameState.attempts = 0;
  
  // Show correct feedback
  showFeedback(`Correct! ${question.explanation}`, true);
  
  // Highlight correct answer for multiple choice
  if (question.type === 'multiple') {
    const options = document.querySelectorAll('.option');
    options[question.correct].classList.add('correct');
  }
  
  elements.nextButton.classList.remove('hidden');
  elements.constitutionalReference.classList.remove('hidden');
}

function handleIncorrectAnswer(question) {
  gameState.attempts++;
  
  if (gameState.attempts >= 3) {
    clearInterval(timer.interval);
    showFeedback(`Maximum attempts reached. Correct answer: ${question.type === 'multiple' ? question.options[question.correct] : question.answer}`);
    
    // Highlight correct answer
    if (question.type === 'multiple') {
      const options = document.querySelectorAll('.option');
      options[question.correct].classList.add('correct');
    }
    
    elements.nextButton.classList.remove('hidden');
    elements.constitutionalReference.classList.remove('hidden');
  } else {
    showFeedback("Incorrect. Try again!");
  }
}

// Show feedback message
function showFeedback(message, isCorrect = false) {
  elements.feedback.textContent = message;
  elements.feedback.className = 'feedback';
  elements.feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
  elements.feedback.classList.remove('hidden');
}

// Move to next question or level
function nextQuestion() {
  gameState.questionIndex++;
  
  if (gameState.questionIndex >= levels[gameState.level].length) {
    // Level completed
    gameState.completedLevels.push(gameState.level);
    
    if (gameState.level === 'easy') {
      gameState.level = 'medium';
    } else if (gameState.level === 'medium') {
      gameState.level = 'hard';
    } else {
      showVoterRegistration();
      return;
    }
    
    gameState.questionIndex = 0;
  }
  
  // Reset for next question
  gameState.attempts = 0;
  clearInterval(timer.interval);
  elements.timerDisplay.classList.add('hidden');
  showQuestion();
}

// Start timer
function startTimer(seconds) {
  clearInterval(timer.interval);
  timer.timeLeft = seconds;
  elements.timerDisplay.textContent = timer.timeLeft;
  elements.timerDisplay.classList.remove('hidden');
  
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
  showFeedback(`Time's up! The correct answer was: ${question.type === 'multiple' ? question.options[question.correct] : question.answer}`);
  
  // Highlight correct answer for multiple choice
  if (question.type === 'multiple') {
    const options = document.querySelectorAll('.option');
    options[question.correct].classList.add('correct');
  }
  
  elements.nextButton.classList.remove('hidden');
  elements.constitutionalReference.classList.remove('hidden');
}

// Show voter registration screen
function showVoterRegistration() {
  elements.questionScreen.classList.add('hidden');
  elements.voterRegistrationScreen.classList.remove('hidden');
  elements.finalScore.textContent = gameState.score;
}

// Check registration status
function checkRegistration(isRegistered) {
  gameState.registeredVoter = isRegistered;
  
  if (isRegistered) {
    showVotingScreen();
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

// Show voting screen
function showVotingScreen() {
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

// Initialize game when loaded
document.addEventListener('DOMContentLoaded', initGame);