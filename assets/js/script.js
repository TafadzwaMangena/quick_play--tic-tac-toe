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

/**
 * To initialize the game upon start.
 */
startGame();

/**
 * Fucntion to target each cellblock; added event listener to target the cellblocks when clicked,
 * Add event listener to the restart game button when it is clicked,
 * Upon start the game is set to be active and the current player's name is displayed.
 */
function startGame(){
    cellBlocks.forEach(cellBlock => cellBlock.addEventListener("click", cellBlockClicked));
    restartGameBtn.addEventListener("click", restartGame);
    playersTurn.textContent = `${currentPlayer}'s turn to play`
    gameActive = true
}

/**
 * Function to collect data from the data cell indexes to check if the cell blocks are not empty,
 * If cells blocks are empty or the game not active, nothing happens.
 * Otherwise collect cell block info and check winner.
 */
function cellBlockClicked(){
    const dataCellIndex = this.getAttribute("data-cell-index");

    if(gameState[dataCellIndex] != "" || !gameActive)
        return;

    updateCellBlock(this, dataCellIndex);
    checkWinner();
}

/**
 * Updating the placeholders,
 * replace the text content of the cellblocks to current player, either "X" or "O".
 */
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