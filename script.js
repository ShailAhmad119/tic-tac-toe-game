// Select all game boxes
let boxes = document.querySelectorAll('.box');

// Select turn display element
let turnContainer = document.querySelector('.turn-Details');

// Audio for clicks
const ting = new Audio('ting.mp3');

// Audio for win
const winAudio = new Audio('copy of gameover.mp3');

// Select reset button
let reset = document.querySelector('.reset');

// Select modal
let modal = document.querySelector('.modal');

// Select modal text
let modalText = document.querySelector('.modalContent h2');

// Select play again button
let playAgain = document.querySelector('.play-again');

// Current turn
let turn = 'X';

// Game over flag
let isGameOver = false;

// Function to change turn
const changeTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
    turnContainer.innerText = `Turn for ${turn}`;
};

// Function to check for win or draw
const checkWin = () => {
    const win = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6],
    ];

    for (let i = 0; i < win.length; i++) {
        let [a, b, c] = win[i];

        if (
            boxes[a].innerHTML !== '' &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            let winner = boxes[a].innerHTML;
            turnContainer.innerText = `${winner} won`;
            isGameOver = true;
            winAudio.play();

            modal.style.display = "flex";
            modalText.textContent = `Player ${winner} wins! 🥳`;

            return;
        }
    }

    // Check for draw
    let draw = true;
    boxes.forEach(box => {
        if (box.innerHTML === '') draw = false;
    });

    if (draw && !isGameOver) {
        isGameOver = true;
        modal.style.display = "flex";
        modalText.textContent = `It's a Draw! 🤝`;
        turnContainer.innerText = "Game Draw";
    }
};

// Add click event listeners to boxes
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', (e) => {
        if (e.currentTarget.innerHTML === '' && !isGameOver) {
            e.currentTarget.innerHTML = turn;
            ting.play();
            checkWin();
            if (!isGameOver) changeTurn();
        }
    });
}

// Reset button functionality
reset.addEventListener('click', () => {
    boxes.forEach(box => box.innerHTML = '');
    turn = 'X';
    isGameOver = false;
    turnContainer.innerText = "Turn for X";
    modal.style.display = "none";
});

// Play Again button functionality
playAgain.addEventListener('click', () => {
    boxes.forEach(box => box.innerHTML = '');
    turn = 'X';
    isGameOver = false;
    turnContainer.innerText = "Turn for X";
    modal.style.display = "none";
});
