// Game state
const gameState = {
    playerName: '',
    currentLevel: '',
    score: 0,
    currentQuestionIndex: 0,
    timer: null,
    timeLeft: 0,
    questions: [],
    isRegisteredVoter: false
};

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const levelSelectScreen = document.getElementById('level-select');
const gameScreen = document.getElementById('game-screen');
const voterRegistrationScreen = document.getElementById('voter-registration');
const votingProcessScreen = document.getElementById('voting-process');
const presidentialElectionScreen = document.getElementById('presidential-election');
const resultsScreen = document.getElementById('results-screen');

const playerNameInput = document.getElementById('player-name');
const startGameBtn = document.getElementById('start-game');
const easyLevelBtn = document.getElementById('easy-level');
const mediumLevelBtn = document.getElementById('medium-level');
const hardLevelBtn = document.getElementById('hard-level');

const displayName = document.getElementById('display-name');
const scoreDisplay = document.getElementById('score');
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

// Event listeners
startGameBtn.addEventListener('click', startGame);
easyLevelBtn.addEventListener('click', () => selectLevel('easy'));
mediumLevelBtn.addEventListener('click', () => selectLevel('medium'));
hardLevelBtn.addEventListener('click', () => selectLevel('hard'));
submitFillAnswerBtn.addEventListener('click', checkFillAnswer);
nextQuestionBtn.addEventListener('click', nextQuestion);
proceedToVoteBtn.addEventListener('click', showVotingProcess);
proceedToElectionBtn.addEventListener('click', showPresidentialElection);
choosePlayerBtn.addEventListener('click', () => showElectionResults(true));
chooseRutoBtn.addEventListener('click', () => showElectionResults(false));
playAgainBtn.addEventListener('click', resetGame);

// Start game function
function startGame() {
    const name = playerNameInput.value.trim();
    if (name === '') {
        alert('Please enter your name to continue');
        return;
    }
    
    gameState.playerName = name;
    welcomeScreen.classList.add('hidden');
    levelSelectScreen.classList.remove('hidden');
}

// Select level function
function selectLevel(level) {
    gameState.currentLevel = level;
    gameState.questions = getQuestionsForLevel(level);
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    
    displayName.textContent = gameState.playerName;
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    currentLevelDisplay.textContent = `Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    
    levelSelectScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    displayQuestion();
}

// Get questions for selected level
function getQuestionsForLevel(level) {
    // Get questions from constitution.js based on level
    const allQuestions = [...constitutionQuestions, ...electionQuestions, ...financeBillQuestions];
    
    // Filter by level and shuffle
    const levelQuestions = allQuestions.filter(q => q.level === level);
    return shuffleArray(levelQuestions).slice(0, 15);
}

// Display current question
function displayQuestion() {
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        startElectionProcess();
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Reset UI elements
    optionsContainer.innerHTML = '';
    fillAnswerContainer.classList.add('hidden');
    feedbackDisplay.classList.add('hidden');
    funFactDisplay.classList.add('hidden');
    nextQuestionBtn.classList.add('hidden');
    
    // Start timer if question has one
    if (question.timer) {
        startTimer(question.timer);
    } else {
        timerDisplay.textContent = '';
    }
    
    // Display question based on type
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
    
    // Show fun fact if available (20% chance)
    if (question.funFact && Math.random() < 0.2) {
        setTimeout(() => {
            funFactDisplay.textContent = `Fun Fact: ${question.funFact}`;
            funFactDisplay.classList.remove('hidden');
        }, 1000);
    }
}

// Start timer for timed questions
function startTimer(seconds) {
    gameState.timeLeft = seconds;
    timerDisplay.textContent = `Time: ${gameState.timeLeft}`;
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        timerDisplay.textContent = `Time: ${gameState.timeLeft}`;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            timeUp();
        }
    }, 1000);
}

// Handle time up
function timeUp() {
    feedbackDisplay.textContent = 'Time is up!';
    feedbackDisplay.classList.add('incorrect');
    feedbackDisplay.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
}

// Check multiple choice answer
function checkAnswer(selectedIndex) {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    
    if (isCorrect) {
        feedbackDisplay.textContent = 'Correct!';
        feedbackDisplay.classList.add('correct');
        feedbackDisplay.classList.remove('incorrect');
        gameState.score += 10;
        scoreDisplay.textContent = `Score: ${gameState.score}`;
    } else {
        feedbackDisplay.textContent = `Incorrect! The correct answer is: ${question.options[question.correctIndex]}`;
        feedbackDisplay.classList.add('incorrect');
        feedbackDisplay.classList.remove('correct');
    }
    
    feedbackDisplay.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
}

// Check fill-in answer
function checkFillAnswer() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const userAnswer = fillAnswerInput.value.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    
    // Simple check for fill-in answers (could be enhanced)
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
        feedbackDisplay.textContent = 'Correct!';
        feedbackDisplay.classList.add('correct');
        feedbackDisplay.classList.remove('incorrect');
        gameState.score += 10;
        scoreDisplay.textContent = `Score: ${gameState.score}`;
    } else {
        feedbackDisplay.textContent = `Incorrect! The correct answer is: ${question.answer}`;
        feedbackDisplay.classList.add('incorrect');
        feedbackDisplay.classList.remove('correct');
    }
    
    feedbackDisplay.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
}

// Move to next question
function nextQuestion() {
    gameState.currentQuestionIndex++;
    displayQuestion();
}

// Start election process after questions
function startElectionProcess() {
    gameScreen.classList.add('hidden');
    voterRegistrationScreen.classList.remove('hidden');
    
    // Check if player is registered voter
    const isRegistered = Math.random() > 0.3; // 70% chance they're registered
    
    if (isRegistered) {
        voterContent.innerHTML = `
            <p>Welcome ${gameState.playerName}! Our records show you are a registered voter.</p>
            <p>You can proceed to learn about the voting process.</p>
        `;
        proceedToVoteBtn.classList.remove('hidden');
    } else {
        voterContent.innerHTML = `
            <h3>You need to register as a voter!</h3>
            <p>To participate in Kenyan elections, you must be a registered voter.</p>
            <p><strong>Requirements for voter registration:</strong></p>
            <ul>
                <li>Be a Kenyan citizen</li>
                <li>Be at least 18 years old</li>
                <li>Have a valid Kenyan ID or passport</li>
            </ul>
            <p><strong>How to register:</strong></p>
            <ol>
                <li>Visit your nearest IEBC registration center</li>
                <li>Present your original ID/passport and a copy</li>
                <li>Have your biometrics taken (photo and fingerprints)</li>
                <li>Receive your voter's card</li>
            </ol>
            <p>Registration is free and should be done at least 60 days before elections.</p>
        `;
        proceedToVoteBtn.classList.remove('hidden');
    }
}

// Show voting process
function showVotingProcess() {
    voterRegistrationScreen.classList.add('hidden');
    votingProcessScreen.classList.remove('hidden');
    
    votingSteps.innerHTML = `
        <h3>How to Vote in Kenyan Elections</h3>
        <ol>
            <li><strong>Verify your registration:</strong> Check your polling station using your ID number on the IEBC website or SMS service</li>
            <li><strong>On election day:</strong> Go to your designated polling station with your voter's card or ID</li>
            <li><strong>Identification:</strong> Present your ID to the election officials for verification</li>
            <li><strong>Voting:</strong>
                <ul>
                    <li>Receive all ballot papers (6 for presidential election)</li>
                    <li>Mark your preferred candidate in secret</li>
                    <li>Fold the ballot papers and drop them in their respective boxes</li>
                </ul>
            </li>
            <li><strong>Verification:</strong> Your finger is marked with indelible ink to prevent double voting</li>
        </ol>
        <p>Remember, voting is your constitutional right (Article 38) and civic duty!</p>
    `;
}

// Show presidential election
function showPresidentialElection() {
    votingProcessScreen.classList.add('hidden');
    presidentialElectionScreen.classList.remove('hidden');
    
    // Generate random positive qualities for the player
    const goodQualities = [
        "Transparent and accountable",
        "Strong anti-corruption stance",
        "Progressive economic policies",
        "Youth empowerment champion",
        "Education reform advocate",
        "Healthcare improvement plan",
        "Infrastructure development focus",
        "Unity and inclusivity promoter"
    ];
    
    const playerQualitiesList = shuffleArray(goodQualities).slice(0, 4);
    playerQualities.innerHTML = '<ul>' + playerQualitiesList.map(q => `<li>${q}</li>`).join('') + '</ul>';
    
    // Generate negative qualities for Ruto
    const badQualities = [
        "Corruption allegations",
        "Economic mismanagement",
        "Tribal favoritism",
        "Broken campaign promises",
        "High cost of living under leadership",
        "Poor education policies",
        "Healthcare system deterioration",
        "Debt accumulation"
    ];
    
    const rutoQualitiesList = shuffleArray(badQualities).slice(0, 4);
    rutoQualities.innerHTML = '<ul>' + rutoQualitiesList.map(q => `<li>${q}</li>`).join('') + '</ul>';
}

// Show election results
function showElectionResults(chosePlayer) {
    presidentialElectionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    if (chosePlayer) {
        resultTitle.textContent = 'Congratulations! Kenya Wins!';
        resultContent.innerHTML = `
            <p>${gameState.playerName}, you have been elected President of Kenya!</p>
            <p>Under your leadership:</p>
            <ul>
                <li>Corruption levels drop significantly</li>
                <li>Economy grows at 7% annually</li>
                <li>Universal healthcare coverage achieved</li>
                <li>Education becomes free and accessible to all</li>
                <li>Infrastructure development transforms the country</li>
                <li>Kenya becomes a regional economic powerhouse</li>
                <li>Unity and peace prevail across all communities</li>
            </ul>
            <p>Thank you for your service to the nation!</p>
        `;
    } else {
        resultTitle.textContent = 'Kenya Suffers Under Ruto';
        resultContent.innerHTML = `
            <p>Despite your knowledge of civic matters, you chose William Ruto as President.</p>
            <p>Under Ruto's second term:</p>
            <ul>
                <li>Corruption reaches unprecedented levels</li>
                <li>Economy collapses with high inflation</li>
                <li>Healthcare system becomes inaccessible to most</li>
                <li>Education standards plummet</li>
                <li>Debt burden cripples the nation</li>
                <li>Tribal tensions rise across the country</li>
                <li>Youth unemployment hits record highs</li>
            </ul>
            <p>Kenya descends into chaos and poverty. Better luck next election!</p>
        `;
    }
}

// Reset game to start over
function resetGame() {
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    playerNameInput.value = '';
    gameState.playerName = '';
    gameState.score = 0;
    gameState.currentQuestionIndex = 0;
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}