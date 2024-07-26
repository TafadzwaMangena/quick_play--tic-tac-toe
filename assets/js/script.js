const playersTurn = document.querySelector("#playersTurn");
const cellBlocks = document.querySelectorAll(".cellBlock");
const restartGameBtn = document.querySelector("#restartGameBtn");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;

let Winmessage = () => `${currentPlayer} has won this round!`;
let drawmessage = () => `This round ended in a draw`;
let currentPlayerTurn = () => `${currentPlayer}'s turn to play`;

startGame();


function startGame(){
    cellBlocks.forEach(cellBlock => cellBlock.addEventListener("click", cellBlockClicked));
    restartGameBtn.addEventListener("click", restartGame);
    playersTurn.textContent = `${currentPlayer}'s turn to play`
    gameActive = true
}

function cellBlockClicked(){
    const dataCellIndex = this.getAttribute("data-cell-index");

    if(gameState[dataCellIndex] != "" || !gameActive)
        return;

    updateCellBlock(this, dataCellIndex);
    checkWinner();
}

function updateCellBlock(cellBlock, index){
    gameState[index] = currentPlayer;
    cellBlock.textContent = currentPlayer
}

function changePlayer(){

}

function checkWinner(){

}

function restartGame(){

}

function player1AddScore(){

}

function drawAddScore(){

}

function player2AddScore(){

}