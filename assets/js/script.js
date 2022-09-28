function game() {
    const actions = ['fire', 'grass', 'rock', 'ice', 'ground'];
    const userWinResults = ['firegrass', 'grassrock', 'rockice', 'iceground', 'groundfire', 'fireice', 'grassground', 'rockfire', 'icegrass', 'groundrock']
    window.addEventListener('load', () => {
        let userChoice = '';

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
            console.log(userChoice);

                startGame();
            })
        })

    })

    function startGame() {

    }

    function getUserChoice(target) {
        console.log(target);
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(user, comp) {
        if (user === comp) {
            console.log('Tie!');
        } else if () {
            console.log('You win!');
        } else {
            console.log('You lose!');
        }
    }
}