const gameState = {
    playerName: '',
    currentLevel: '',
    score: 0,
    currentQuestionIndex: 0,
    timer: null,
    timeLeft: 0,
    questions: [],
    currentScreen: 'welcome'
};

const screens = {
    welcome: document.getElementById('welcome-screen'),
    levelSelect: document.getElementById('level-select'),
    game: document.getElementById('game-screen'),
    voterRegistration: document.getElementById('voter-registration'),
    votingProcess: document.getElementById('voting-process'),
    presidentialElection: document.getElementById('presidential-election'),
    results: document.getElementById('results-screen')
};

const playerNameInput = document.getElementById('player-name');
const startGameBtn = document.getElementById('start-game');
const levelButtons = {
    easy: document.getElementById('easy-level'),
    medium: document.getElementById('medium-level'),
    hard: document.getElementById('hard-level')
};

const displayName = document.getElementById('display-name');
const scoreDisplays = document.querySelectorAll('.score-display');
const timerDisplay = document.getElementById('timer');
const currentLevelDisplay = document.getElementById('current-level');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const fillAnswerContainer = document.getElementById('fill-answer-container');
const fillAnswerInput = document.getElementById('fill-answer');
const submitFillAnswerBtn = document.getElementById('submit-fill-answer');
const nextQuestionBtn = document.getElementById('next-question');
const feedbackDisplay = document.getElementById('feedback');
const funFactDisplay = document.getElementById('fun-fact');

const voterContent = document.getElementById('voter-content');
const proceedToVoteBtn = document.getElementById('proceed-to-vote');
const votingSteps = document.getElementById('voting-steps');
const proceedToElectionBtn = document.getElementById('proceed-to-election');

const playerQualities = document.getElementById('player-qualities');
const rutoQualities = document.getElementById('ruto-qualities');
const choosePlayerBtn = document.getElementById('choose-player');
const chooseRutoBtn = document.getElementById('choose-ruto');

const resultTitle = document.getElementById('result-title');
const resultContent = document.getElementById('result-content');
const playAgainBtn = document.getElementById('play-again');

const backButtons = document.querySelectorAll('.back-btn');

function initGame() {
    loadGameState();
    setupEventListeners();
    
    if (gameState.currentScreen && gameState.currentScreen !== 'welcome') {
        showScreen(gameState.currentScreen);
        if (gameState.currentScreen === 'game') displayQuestion();
    }
}

function loadGameState() {
    const savedState = localStorage.getItem('ikuluRunGameState');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(gameState, parsedState);
        
        if (gameState.playerName) {
            playerNameInput.value = gameState.playerName;
            displayName.textContent = gameState.playerName;
        }
        
        updateScoreDisplay();
    }
}

function saveGameState() {
    localStorage.setItem('ikuluRunGameState', JSON.stringify(gameState));
}

function setupEventListeners() {
    startGameBtn.addEventListener('click', startGame);
    levelButtons.easy.addEventListener('click', () => selectLevel('easy'));
    levelButtons.medium.addEventListener('click', () => selectLevel('medium'));
    levelButtons.hard.addEventListener('click', () => selectLevel('hard'));
    submitFillAnswerBtn.addEventListener('click', checkFillAnswer);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    proceedToVoteBtn.addEventListener('click', showVotingProcess);
    proceedToElectionBtn.addEventListener('click', showPresidentialElection);
    choosePlayerBtn.addEventListener('click', () => showElectionResults(true));
    chooseRutoBtn.addEventListener('click', () => showElectionResults(false));
    playAgainBtn.addEventListener('click', resetGame);
    
    backButtons.forEach(btn => btn.addEventListener('click', goBack));
    window.addEventListener('beforeunload', saveGameState);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
    gameState.currentScreen = screenName;
    saveGameState();
    updateScoreDisplay();
}

function startGame() {
    const name = playerNameInput.value.trim();
    if (!name) return alert('Please enter your name');
    
    gameState.playerName = name;
    showScreen('levelSelect');
}

function selectLevel(level) {
    gameState.currentLevel = level;
    gameState.questions = getQuestionsForLevel(level);
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    
    displayName.textContent = gameState.playerName;
    currentLevelDisplay.textContent = `Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    
    showScreen('game');
    displayQuestion();
}

function displayQuestion() {
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        startElectionProcess();
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestionIndex];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    fillAnswerContainer.classList.add('hidden');
    feedbackDisplay.classList.add('hidden');
    funFactDisplay.classList.add('hidden');
    nextQuestionBtn.classList.add('hidden');
    
    if (question.timer) startTimer(question.timer);
    else timerDisplay.textContent = '';
    
    if (question.type === 'multiple') {
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'fill') {
        fillAnswerContainer.classList.remove('hidden');
        fillAnswerInput.value = '';
        fillAnswerInput.focus();
    }
    
    if (question.funFact && Math.random() < 0.2) {
        setTimeout(() => {
            funFactDisplay.textContent = `Fun Fact: ${question.funFact}`;
            funFactDisplay.classList.remove('hidden');
        }, 1000);
    }
}

function startTimer(seconds) {
    gameState.timeLeft = seconds;
    timerDisplay.textContent = `Time: ${gameState.timeLeft}`;
    
    if (gameState.timer) clearInterval(gameState.timer);
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        timerDisplay.textContent = `Time: ${gameState.timeLeft}`;
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            timeUp();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    
    feedbackDisplay.textContent = isCorrect ? 'Correct!' : 
        `Incorrect! The correct answer is: ${question.options[question.correctIndex]}`;
    feedbackDisplay.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    
    if (isCorrect) {
        gameState.score += 10;
        updateScoreDisplay();
    }
    
    feedbackDisplay.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
    if (gameState.timer) clearInterval(gameState.timer);
}

function checkFillAnswer() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = fillAnswerInput.value.trim().toLowerCase() === question.answer.toLowerCase();
    
    feedbackDisplay.textContent = isCorrect ? 'Correct!' : `Incorrect! The correct answer is: ${question.answer}`;
    feedbackDisplay.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    
    if (isCorrect) {
        gameState.score += 10;
        updateScoreDisplay();
    }
    
    feedbackDisplay.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
    if (gameState.timer) clearInterval(gameState.timer);
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    displayQuestion();
}

function startElectionProcess() {
    showScreen('voterRegistration');
    
    const isRegistered = Math.random() > 0.3;
    voterContent.innerHTML = isRegistered ? `
        <p>Welcome ${gameState.playerName}! You are a registered voter.</p>
        <p>Proceed to learn about the voting process.</p>
    ` : `
        <h3>Voter Registration Required</h3>
        <p><strong>Requirements:</strong></p>
        <ul>
            <li>Kenyan citizen</li>
            <li>At least 18 years old</li>
            <li>Valid Kenyan ID/passport</li>
        </ul>
        <p><strong>Registration Steps:</strong></p>
        <ol>
            <li>Visit IEBC registration center</li>
            <li>Present ID and copy</li>
            <li>Biometrics capture</li>
            <li>Receive voter's card</li>
        </ol>
    `;
}

function showVotingProcess() {
    showScreen('votingProcess');
    votingSteps.innerHTML = `
        <h3>Voting Process</h3>
        <ol>
            <li>Verify polling station</li>
            <li>Go to polling station with ID</li>
            <li>Present ID for verification</li>
            <li>Receive ballot papers</li>
            <li>Mark ballot secretly</li>
            <li>Fold and drop in boxes</li>
            <li>Finger marked with ink</li>
        </ol>
    `;
}

function showPresidentialElection() {
    showScreen('presidentialElection');
    
    const goodQualities = shuffleArray([
        "Transparent leadership", "Anti-corruption", "Economic reforms", 
        "Youth empowerment", "Education focus", "Healthcare improvements"
    ]).slice(0, 4);
    
    const badQualities = shuffleArray([
        "Corruption allegations", "Economic mismanagement", "Tribal favoritism",
        "Broken promises", "High living costs", "Debt accumulation"
    ]).slice(0, 4);
    
    playerQualities.innerHTML = '<ul>' + goodQualities.map(q => `<li>${q}</li>`).join('') + '</ul>';
    rutoQualities.innerHTML = '<ul>' + badQualities.map(q => `<li>${q}</li>`).join('') + '</ul>';
}

function showElectionResults(chosePlayer) {
    showScreen('results');
    
    if (chosePlayer) {
        resultTitle.textContent = 'Congratulations! Kenya Wins!';
        resultContent.innerHTML = `
            <p>Under your leadership:</p>
            <ul>
                <li>Corruption decreases</li>
                <li>Economy grows at 7%</li>
                <li>Universal healthcare achieved</li>
                <li>Education improves</li>
            </ul>
        `;
    } else {
        resultTitle.textContent = 'Kenya Suffers Under Ruto';
        resultContent.innerHTML = `
            <p>Under Ruto's leadership:</p>
            <ul>
                <li>Corruption increases</li>
                <li>Economy declines</li>
                <li>Healthcare deteriorates</li>
                <li>Debt burden grows</li>
            </ul>
        `;
    }
}

function goBack() {
    const backMap = {
        levelSelect: 'welcome',
        game: 'levelSelect',
        voterRegistration: 'game',
        votingProcess: 'voterRegistration',
        presidentialElection: 'votingProcess',
        results: 'presidentialElection'
    };
    
    if (gameState.currentScreen in backMap) {
        showScreen(backMap[gameState.currentScreen]);
    }
}

function resetGame() {
    localStorage.removeItem('ikuluRunGameState');
    gameState.playerName = '';
    gameState.currentLevel = '';
    gameState.score = 0;
    gameState.currentQuestionIndex = 0;
    gameState.currentScreen = 'welcome';
    playerNameInput.value = '';
    showScreen('welcome');
}

function updateScoreDisplay() {
    scoreDisplays.forEach(display => {
        display.textContent = `Score: ${gameState.score}`;
    });
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

window.addEventListener('DOMContentLoaded', initGame);