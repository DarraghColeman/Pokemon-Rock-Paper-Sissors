function game() {
    const actions = ['fire', 'grass', 'rock', 'ice', 'ground'];
    const userWinResults = ['firegrass', 'grassrock', 'rockice', 'iceground', 'groundfire', 'fireice', 'grassground', 'rockfire', 'icegrass', 'groundrock']
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');


    let currentScore = null;

    // EVENT LISTENER FOR GAME START
    window.addEventListener('load', () => {
        retrieveScoreFromLocalStorage();

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();
            
                startGame();
            })
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);

    })

    // GAME FUNCTIONS
    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);

    }

    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    //RESULT CALCULATIONS
    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleElement.innerText = 'Tie!';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleElement.innerText = 'You win!';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose!';
            calculateScore(-1);
        }
    }

    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);
    }

    function buildChoiceElement(isItUserElement, className) {
        const el = document.createdElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="assets/images/${className}.png" alt="${className}">`
        if (isItUserElement) {
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }

    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }

    //SCORE CALCULATION & STORAGE
    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }

    //LOCAL STORAGE SCORE: Option can be removed
    function retrieveScoreFromLocalStorage() {
        const score = +window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    // MODAL: For "Rules" pop-up window
    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

    modalBg.addEventListener('click', (event) =>{
        if (event.targer === modalBg) {
            hideModal();
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal() {
        modal.classList.remove('active');
        modalBg.classList.remove('active');
    }
}

game();