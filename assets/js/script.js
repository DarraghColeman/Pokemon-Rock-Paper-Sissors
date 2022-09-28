window.addEventListener('load', () => {
    let userChoice = '';

    document.querySelectorAll('.user-choice .game-card').forEach(card => {
        card.addEventListener('click', (ev) => {
            userChoice = getUserChoice(ev.target);
            startGame();
        })
    })

})

function startGame() {

}

function getUserChoice(target) {
    console.log(target);
}