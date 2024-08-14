const playersTurn = document.querySelector("#players-turn");
const cellBlocks = document.querySelectorAll(".cell-block");
const restartGameBtn = document.querySelector("#restart-game-btn");
const nextRoundBtn = document.querySelector("#next-round-btn");
const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");
const drawScore = document.querySelector("#draw-score");
const welcomeIntro = document.querySelector(".intropage");
const rulesAndInitiate = document.querySelector(".rules");
const gameArea = document.querySelector(".game-area");
const restartConfBtn = document.querySelector("#restart-confirm-btn");
const dialog = document.querySelector("dialog");
const restartConf = document.querySelector("dialog + button");
const closeDialog = document.querySelector("dialog button");

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
 * Fucntion to target each cellblock; added event listener to target the cellblocks when clicked,
 * Add event listener to the restart game button when it is clicked,
 * Upon start the game is set to be active and the current player's name is displayed.
 */
function startGame() {
  cellBlocks.forEach((cellBlock) =>
    cellBlock.addEventListener("click", cellBlockClicked)
  );
  restartConfBtn.addEventListener("click", yesRestart);
  playersTurn.textContent = currentPlayerTurn();
  gameActive = true;

  nextRoundBtn.addEventListener("click", nextRound);
  playersTurn.textContent = currentPlayerTurn();
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
  cellBlock.textContent = currentPlayer === "X" ? "X" : "O";
  addColour(cellBlock);
  nextRoundBtn.disabled = true;
  restartGameBtn.disabled = true;
}

// Fucnction to add color to current player cell block, Orange for current player "X" otherwise blue.
function addColour(cellBlock) {
  const color = currentPlayer == "X" ? "orange" : "blue";
  cellBlock.style.color = color;
}

/**
 * Use ternary operator to check if the current player "X" is "O" otherwise "X",
 * Display whose turn it is.
 */
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  playersTurn.textContent = currentPlayerTurn();
}

/**
 * Function to check winner.
 * For loop to check win conditions in win conditions array.
 * If there are empty cell blocks, continue game.
 * If any win conditions are met, round is won, break.
 * If round is won, dispaly win message, increase current player score by1, game not active.
 * Else if, there are no empty spaces, display draw message, game is not active and increase draw score by 1.
 * Otherwise change player.
 */
function checkWinner() {
  let roundWon = false;

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
    let player1 = parseInt(player1Score.innerText);
    let player2 = parseInt(player2Score.innerText);
    nextRoundBtn.disabled = false;
    restartGameBtn.disabled = false;
    if (currentPlayer === "X") {
      player1Score.innerText = ++player1;
    } else {
      player2Score.innerText = ++player2;
    }
    gameActive = false;
  } else if (!gameState.includes("")) {
    playersTurn.textContent = drawMessage();
    gameActive = false;
    let oldScore = parseInt(document.getElementById("draw-score").innerText);
    document.getElementById("draw-score").innerText = ++oldScore;
    console.log("buttons enabling");
    nextRoundBtn.disabled = false;
    restartGameBtn.disabled = false;
  } else {
    changePlayer();
  }
}

/**
 * Function to start next round.
 * Change current player to and current player message to "X", clear cell blocks, set game active.
 */
function nextRound() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  playersTurn.textContent = currentPlayerTurn();
  cellBlocks.forEach((cellBlock) => (cellBlock.textContent = ""));
  gameActive = true;
}

/**
 * Function to restart Game.
 * Change current player to and current player message to "X", clear cell blocks, set game active.
 * Reset all scores
 */
function yesRestart() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  playersTurn.textContent = currentPlayerTurn();
  cellBlocks.forEach((cellBlock) => (cellBlock.textContent = ""));
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  drawScore.innerText = 0;
  gameActive = true;
}

// "Show the dialog" button opens the dialog modally
restartConf.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeDialog.addEventListener("click", () => {
  dialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
  startGame();

  if (!gameArea) {
    console.error("page not found");
  }

  window.showNextPage = function (index) {
    showPageOne();
  };

  window.showNextPage = function (index) {
    showPageTwo();
  };

  window.showNextPage = function (index) {
    showPageThree();
  };
});

//Functions to display different html pages.
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