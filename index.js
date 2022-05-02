const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const btn= document.getElementById('restartButton');
const winningMsgTxtEl = document.querySelector("[data-winning-message-text]");
const winningMessage = document.getElementById("winning-message");
const cellEls = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
let circleTurn;
startGame();


function startGame() {
  circleTurn = false;

  cellEls.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  swapTurn();
  setBoardHoverClass();
}

function endGame(draw) {
  if (draw) {
    winningMsgTxtEl.innerText = "Draw!";
  } else {
    winningMsgTxtEl.innerText = `${circleTurn ? "O's " : "X's"}Wins!`;
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cellEls].every((cell) => {
    return (
      cell.classList.contains("X_CLASS") ||
      cell.classList.contains("CIRCLE_CLASS")
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellEls[index].classList.contains(currentClass);
    });
  });
}



btn.addEventListener('click',() => {
 
});