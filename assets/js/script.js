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
];

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;

let winMessage = () => `${currentPlayer} has won this round!`;
const drawMessage = () => `This round ended in a draw`;
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
function startGame() {
  cellBlocks.forEach((cellBlock) =>
    cellBlock.addEventListener("click", cellBlockClicked)
  );
  restartGameBtn.addEventListener("click", restartGame);
  playersTurn.textContent = `${currentPlayer}'s turn to play`;
  gameActive = true;
}

/**
 * Function to collect data from the data cell indexes to check if the cell blocks are not empty,
 * If cells blocks are empty or the game not active, nothing happens.
 * Otherwise collect cell block info and check winner.
 */
function cellBlockClicked() {
  const dataCellIndex = this.getAttribute("data-cell-index");

  if (gameState[dataCellIndex] != "" || !gameActive) {
    return;
  }

  updateCellBlock(this, dataCellIndex);
  checkWinner();
}

/**
 * Updating the placeholders,
 * replace the text content of the cellblocks to current player, either "X" or "O".
 */
function updateCellBlock(cellBlock, index) {
  gameState[index] = currentPlayer;
  cellBlock.textContent = currentPlayer;
}

/**
 * Use ternary operator to check if the current player "X" is "O" otherwise "X",
 * use template literal to display whose turn it is.
 */
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  playersTurn.textContent = `${currentPlayer}'s turn to play`;
}

function checkWinner() {
  roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellBlockA = gameState[condition[0]];
    const cellBlockB = gameState[condition[1]];
    const cellBlockC = gameState[condition[2]];

    if (cellBlockA == "" || cellBlockB == "" || cellBlockC == "") {
      continue;
    }
    if (cellBlockA == cellBlockB && cellBlockB == cellBlockC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    playersTurn.textContent = winMessage();
    gameActive = false;
  } else if (!gameState.includes("")) {
    playersTurn.textContent = drawMessage();
    gameActive = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  playersTurn.textContent = `${currentPlayer}'s turn to play`;
  cellBlocks.forEach((cellBlock) => (cellBlock.textContent = ""));
  gameActive = true;
}

const welcomeIntro = document.querySelector(".intropage");
const rulesAndInitiate = document.querySelector(".rules");
const gameArea = document.querySelector(".gameArea");
const optionsBtn = document.querySelector("#options-btn");
const initiateGameBtn = document.querySelector("#initiate-game-btn");

document.addEventListener("DOMContentLoaded", () => {
    const pages = [
      document.querySelector(".intro-options"),
      document.querySelector(".rules"),
      document.querySelector(".gameArea"),
    ];  

if (!gameArea) {
    console.error("page not found");
  }

  console.log(gameArea);

  window.showNextPage = function (index) {
    showPageOne();
    console.log("clicked");
  };
});

function showPageOne() {
  welcomeIntro.classList.add("active");
  welcomeIntro.classList.remove("hidden");
  rulesAndInitiate.classList.remove("active");
  rulesAndInitiate.classList.add("hidden");
  gameArea.classList.remove("active");
  gameArea.classList.add("hidden");
}

function showPageTwo() {
  rulesAndInitiate.classList.add("active");
  rulesAndInitiate.classList.remove("hidden");
  welcomeIntro.classList.remove("active");
  welcomeIntro.classList.add("hidden");
  gameArea.classList.remove("active");
  gameArea.classList.add("hidden");
}

function showPageThree() {
  gameArea.classList.add("active");
  gameArea.classList.remove("hidden");
  welcomeIntro.classList.remove("active");
  welcomeIntro.classList.add("hidden");
  rulesAndInitiate.classList.remove("active");
  rulesAndInitiate.classList.add("hidden");
}
