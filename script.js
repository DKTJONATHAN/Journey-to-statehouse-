// Game levels
const levels = {
  easy: [...], // Current questions (basic civic knowledge)
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

let currentLevel = 'easy';
let currentQuestion = 0;
let score = 0;

// Modified nextQuestion() function
function nextQuestion() {
  currentQuestion++;
  
  // Check if level completed
  if (currentQuestion >= levels[currentLevel].length) {
    if (currentLevel === 'easy') {
      currentLevel = 'medium';
    } else if (currentLevel === 'medium') {
      currentLevel = 'hard';
    } else if (currentLevel === 'hard') {
      currentLevel = 'voterEducation';
    } else {
      showRegistrationCheck();
      return;
    }
    currentQuestion = 0;
  }
  
  showQuestion();
}

// New voter registration check
function showRegistrationCheck() {
  document.getElementById('questionScreen').classList.add('hidden');
  document.getElementById('voterRegistrationScreen').classList.remove('hidden');
}

// New function for registration response
function checkRegistration(isRegistered) {
  if (isRegistered) {
    document.getElementById('voterRegistrationScreen').classList.add('hidden');
    document.getElementById('votingScreen').classList.remove('hidden');
  } else {
    document.getElementById('registrationInfo').classList.remove('hidden');
    document.getElementById('proceedToVote').classList.remove('hidden');
  }
}
// Enhanced game state
let gameState = {
  level: 'easy',
  questionIndex: 0,
  score: 0,
  registeredVoter: null
};

// Timer for hard level
let timer = {
  timeLeft: 30,
  interval: null
};

function startHardLevel() {
  // Start 30-second timer for hard questions
  timer.interval = setInterval(() => {
    timer.timeLeft--;
    document.getElementById('timer').textContent = timer.timeLeft;
    if(timer.timeLeft <= 0) timeUp();
  }, 1000);
}

function showConstitutionalReference(article) {
  // Display relevant constitutional text during questions
  const ref = constitution[article.chapter].find(a => a.article === article.article);
  document.getElementById('constitution-ref').innerHTML = `
    <h4>${ref.title} (Article ${ref.article})</h4>
    <p>${ref.text.substring(0, 150)}...</p>
    <button onclick="showFullArticle('${article.chapter}', '${article.article}')">
      Read Full Article
    </button>
  `;
}
// Level progression thresholds
const LEVEL_REQUIREMENTS = {
  medium: { score: 70%, time: null },
  hard: { score: 80%, time: "30s per question" },
  vote: { completeAll: true }
};

// Updated vote function
function vote(choice) {
  document.getElementById('votingScreen').classList.add('hidden');
  const victoryScreen = document.getElementById('victoryScreen');
  const victoryMessage = document.getElementById('victoryMessage');
  
  victoryMessage.innerHTML = `
    <p>You scored ${score} out of ${getTotalQuestions()}!</p>
    ${choice === 'good' ? 
      "🇰🇪 Your choice shows commitment to good governance! Kenya needs informed citizens like you." : 
      "⚠️ Your choice maintains the status quo. Stay engaged with civic processes to see change."}
    <p>Remember to participate in actual elections and hold leaders accountable.</p>
  `;
  
  victoryScreen.classList.remove('hidden');
}