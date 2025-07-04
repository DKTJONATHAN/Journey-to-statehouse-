// Game levels with all 45 questions
const levels = {
    easy: [
        {
            type: "multiple",
            question: "When was Kenya's current constitution promulgated?",
            options: ["2005", "2010", "2015", "2020"],
            correct: 1,
            explanation: "The 2010 Constitution was promulgated on August 27, 2010.",
            timer: 20,
            reference: "Constitution of Kenya (2010) Preamble"
        },
        // ... (include all 15 easy questions)
    ],
    medium: [
        // ... (include all 15 medium questions)
    ],
    hard: [
        // ... (include all 15 hard questions)
    ]
};

// Game state
let gameState = {
    currentLevel: 'easy',
    currentQuestion: 0,
    attempts: 0,
    score: 0,
    completedQuestions: [],
    timeLeft: 0,
    timerInterval: null
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
        currentLevel: 'easy',
        currentQuestion: 0,
        attempts: 0,
        score: 0,
        completedQuestions: [],
        timeLeft: 0,
        timerInterval: null
    };

    elements.startScreen.classList.add('hidden');
    elements.questionScreen.classList.remove('hidden');
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = levels[gameState.currentLevel][gameState.currentQuestion];
    const progressPercent = ((gameState.currentQuestion + 1) / levels[gameState.currentLevel].length) * 100;

    elements.progressBar.style.width = `${progressPercent}%`;
    elements.levelText.textContent = `${gameState.currentLevel.toUpperCase()} Level - Question ${gameState.currentQuestion + 1} of ${levels[gameState.currentLevel].length}`;
    elements.questionText.textContent = question.question;

    // Clear previous feedback
    elements.feedback.classList.add('hidden');
    elements.nextButton.classList.add('hidden');
    elements.constitutionRef.textContent = question.reference;
    elements.constitutionalReference.classList.add('hidden');

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

// Timer functions
function startTimer(seconds) {
    gameState.timeLeft = seconds;
    elements.timerDisplay.textContent = gameState.timeLeft;
    elements.timerDisplay.classList.remove('hidden');
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        elements.timerDisplay.textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            handleTimeExpired();
        }
    }, 1000);
}

function handleTimeExpired() {
    clearInterval(gameState.timerInterval);
    const question = levels[gameState.currentLevel][gameState.currentQuestion];
    showFeedback(`Time's up! The correct answer was: ${question.type === 'multiple' ? question.options[question.correct] : question.answer}`);
    lockQuestion();
}

// Answer checking
function checkAnswer() {
    const question = levels[gameState.currentLevel][gameState.currentQuestion];
    let userAnswer, isCorrect;
    
    if (question.type === 'multiple') {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            showFeedback("Please select an answer!");
            return;
        }
        userAnswer = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
        isCorrect = (userAnswer === question.correct);
    } else {
        userAnswer = elements.inputAnswer.value.trim();
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
    gameState.score++;
    
    const question = levels[gameState.currentLevel][gameState.currentQuestion];
    showFeedback(`Correct! ${question.explanation}`, true);
    elements.constitutionalReference.classList.remove('hidden');
    elements.nextButton.classList.remove('hidden');
    
    if (question.type === 'multiple') {
        document.querySelectorAll('.option')[question.correct].classList.add('correct');
    }
}

function handleIncorrectAnswer() {
    gameState.attempts++;
    
    if (gameState.attempts >= 3) {
        clearInterval(gameState.timerInterval);
        const question = levels[gameState.currentLevel][gameState.currentQuestion];
        showFeedback(`Maximum attempts reached. Correct answer: ${question.type === 'multiple' ? question.options[question.correct] : question.answer}`);
        elements.constitutionalReference.classList.remove('hidden');
        elements.nextButton.classList.remove('hidden');
        
        if (question.type === 'multiple') {
            document.querySelectorAll('.option')[question.correct].classList.add('correct');
        }
    } else {
        showFeedback("Incorrect. Try again!");
    }
}

// Navigation
function nextQuestion() {
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion >= levels[gameState.currentLevel].length) {
        // Level completed
        if (gameState.currentLevel === 'easy') {
            gameState.currentLevel = 'medium';
        } else if (gameState.currentLevel === 'medium') {
            gameState.currentLevel = 'hard';
        } else {
            showVoterRegistration();
            return;
        }
        gameState.currentQuestion = 0;
    }
    
    resetForNewQuestion();
}

function showVoterRegistration() {
    elements.questionScreen.classList.add('hidden');
    elements.voterRegistrationScreen.classList.remove('hidden');
    elements.finalScore.textContent = gameState.score;
}

// Voting functions
function checkRegistration(isRegistered) {
    if (isRegistered) {
        showVotingScreen();
    } else {
        elements.registrationInfo.classList.remove('hidden');
        elements.proceedToVote.classList.remove('hidden');
    }
}

function proceedToVote() {
    elements.registrationInfo.classList.add('hidden');
    elements.proceedToVote.classList.add('hidden');
    showVotingScreen();
}

function showVotingScreen() {
    elements.voterRegistrationScreen.classList.add('hidden');
    elements.votingScreen.classList.remove('hidden');
}

function vote(choice) {
    elements.votingScreen.classList.add('hidden');
    elements.victoryScreen.classList.remove('hidden');
    
    const totalQuestions = Object.values(levels).reduce((sum, level) => sum + level.length, 0);
    
    if (choice === 'good') {
        elements.victoryTitle.textContent = "🏆 VICTORY AT STATE HOUSE! 🏆";
        elements.victoryMessage.innerHTML = `
            <p>You scored ${gameState.score} out of ${totalQuestions}!</p>
            <p>🇰🇪 Your campaign has triumphed! The people have chosen reform, integrity and progressive leadership.</p>
            <p>Remember to uphold the constitution and serve all Kenyans equally.</p>
        `;
    } else {
        elements.victoryTitle.textContent = "⚠️ CAMPAIGN DEFEAT ⚠️";
        elements.victoryMessage.innerHTML = `
            <p>You scored ${gameState.score} out of ${totalQuestions}!</p>
            <p>The establishment has prevailed. Kenyans will continue demanding change.</p>
            <p>Stay engaged with civic processes and try again in the next election.</p>
        `;
    }
}

// Helper functions
function showFeedback(message, isCorrect = false) {
    elements.feedback.textContent = message;
    elements.feedback.classList.remove('correct', 'incorrect');
    elements.feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.feedback.classList.remove('hidden');
}

function lockQuestion() {
    if (elements.inputAnswer) elements.inputAnswer.disabled = true;
    if (elements.submitAnswer) elements.submitAnswer.disabled = true;
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    elements.nextButton.classList.remove('hidden');
}

function resetForNewQuestion() {
    gameState.attempts = 0;
    elements.timerDisplay.classList.add('hidden');
    if (elements.inputAnswer) {
        elements.inputAnswer.disabled = false;
        elements.inputAnswer.value = '';
    }
    if (elements.submitAnswer) elements.submitAnswer.disabled = false;
    showQuestion();
}

function restartGame() {
    elements.victoryScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// Initialize game when loaded
document.addEventListener('DOMContentLoaded', initGame);