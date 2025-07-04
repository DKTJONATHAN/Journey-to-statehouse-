let currentQuestion = 0;
let score = 0;
let gameStarted = false;

const questions = [
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
    },
    {
        type: "multiple",
        obstacle: "The Rights Barrier",
        question: "Which of these is NOT one of the fundamental human rights guaranteed by the Kenyan Constitution?",
        options: ["Right to life", "Right to freedom of expression", "Right to free luxury goods", "Right to education"],
        correct: 2,
        explanation: "The Constitution guarantees basic human rights but not luxury goods."
    },
    {
        type: "fill",
        obstacle: "The Democratic Process Challenge",
        question: "What is the minimum age requirement to vote in Kenya?",
        answer: "18",
        explanation: "Citizens must be 18 years or older to register and vote in Kenya."
    },
    {
        type: "multiple",
        obstacle: "The Governance Test",
        question: "What is the principle that ensures no one is above the law in Kenya?",
        options: ["Rule of Law", "Democracy", "Federalism", "Republicanism"],
        correct: 0,
        explanation: "The Rule of Law ensures that everyone, including leaders, is subject to the law."
    },
    {
        type: "multiple",
        obstacle: "The County System Challenge",
        question: "How many counties does Kenya have according to the 2010 Constitution?",
        options: ["45", "47", "49", "52"],
        correct: 1,
        explanation: "Kenya has 47 counties as established by the 2010 Constitution."
    },
    {
        type: "fill",
        obstacle: "The Electoral Process Test",
        question: "What does IEBC stand for?",
        answer: "Independent Electoral and Boundaries Commission",
        explanation: "The IEBC is responsible for conducting free and fair elections in Kenya."
    },
    {
        type: "multiple",
        obstacle: "The Final Constitutional Challenge",
        question: "Which body has the power to impeach the President of Kenya?",
        options: ["The Senate", "The National Assembly", "The Supreme Court", "The Cabinet"],
        correct: 1,
        explanation: "The National Assembly has the power to impeach the President, subject to Senate approval."
    }
];

function startGame() {
    gameStarted = true;
    currentQuestion = 0;
    score = 0;
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('questionScreen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    
    document.getElementById('progressBar').style.width = progressPercent + '%';
    document.getElementById('levelText').textContent = `Challenge ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('obstacleWarning').textContent = `⚠️ Obstacle: ${question.obstacle}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Clear previous feedback
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('nextButton').classList.add('hidden');
    
    if (question.type === "multiple") {
        showMultipleChoice(question);
    } else {
        showFillAnswer(question);
    }
}

function showMultipleChoice(question) {
    document.getElementById('optionsContainer').classList.remove('hidden');
    document.getElementById('inputAnswer').classList.add('hidden');
    document.getElementById('submitAnswer').classList.add('hidden');
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        container.appendChild(optionDiv);
    });
}

function showFillAnswer(question) {
    document.getElementById('optionsContainer').classList.add('hidden');
    document.getElementById('inputAnswer').classList.remove('hidden');
    document.getElementById('submitAnswer').classList.remove('hidden');
    
    document.getElementById('inputAnswer').value = '';
    document.getElementById('inputAnswer').focus();
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    const feedback = document.getElementById('feedback');
    feedback.textContent = question.explanation;
    
    if (selectedIndex === question.correct) {
        feedback.classList.add('correct');
        score++;
    } else {
        feedback.classList.add('incorrect');
    }
    
    feedback.classList.remove('hidden');
    document.getElementById('nextButton').classList.remove('hidden');
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const userAnswer = document.getElementById('inputAnswer').value.trim();
    const feedback = document.getElementById('feedback');
    
    feedback.textContent = question.explanation;
    
    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        feedback.classList.add('correct');
        feedback.textContent = "Correct! " + question.explanation;
        score++;
    } else {
        feedback.classList.add('incorrect');
        feedback.textContent = `Incorrect. The correct answer is: ${question.answer}. ${question.explanation}`;
    }
    
    feedback.classList.remove('hidden');
    document.getElementById('nextButton').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('questionScreen').classList.add('hidden');
    document.getElementById('votingScreen').classList.remove('hidden');
}

function vote(choice) {
    document.getElementById('votingScreen').classList.add('hidden');
    const victoryScreen = document.getElementById('victoryScreen');
    const victoryMessage = document.getElementById('victoryMessage');
    
    if (choice === 'good') {
        victoryMessage.textContent = `You've chosen wisely! With ${score}/${questions.length} correct answers, you've demonstrated excellent civic knowledge. Dr. Amani Mwangi will lead Kenya to a brighter future with your support!`;
    } else {
        victoryMessage.textContent = `Despite your ${score}/${questions.length} correct answers, you've chosen to maintain the status quo. Kenya's future remains uncertain under the current leadership.`;
    }
    
    victoryScreen.classList.remove('hidden');
}

function restartGame() {
    document.getElementById('victoryScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
}