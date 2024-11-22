function header() {
  const header = "┏━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━┓";
  return header;
}

function linePrinting() {
  let line = "";
  for (let i = 0; i < 3; i++) {
    line += "┃";
    for (let k = 0; k < 12; k++) {
      line += " ";
    }
  }
  line += "┃";
  return line;
}

let number = 0;
function cellNumberPrinting() {
  let line = "";
  for (let i = 0; i < 3; i++) {
    line += "┃";
    number++;
    for (let k = 0; k < 6; k++) {
      line += " ";
    }
    line += number;

    for (let k = 0; k < 5; k++) {
      line += " ";
    }
  }
  line += "┃";
  return line;
}

function seperatorPrinting() {
  let line = "";
  line += "┣";
  for (let i = 0; i < 2; i++) {
    for (let k = 0; k < 12; k++) {
      line += "━";
    }
    line += "╋";
  }
  for (let k = 0; k < 12; k++) {
    line += "━";
  }

  line += "┫";
  return line;
}

function footer() {
  const footer = "┗━━━━━━━━━━━━┻━━━━━━━━━━━━┻━━━━━━━━━━━━┛";
  return footer;
}

let sourceBoard = "";
function getSourceTable() {
  sourceBoard += header() + "\n";

  for (let index = 0; index < 3; index++) {

    sourceBoard += linePrinting() + "\n";
    sourceBoard += cellNumberPrinting() + "\n";

    if (index != 2) {
      sourceBoard += seperatorPrinting() + "\n";
    }
  }

  sourceBoard += footer() + "\n";
  return sourceBoard;
}

function playerOneInput() {
  const userInput = +prompt("Enter a number [P1] ○:");
  updatedBoard = validateUserInput(userInput, playerOneIcon);
}

function playerTwoInput() {
  const userInput = +prompt("Enter a number [P2] ●:");
  updatedBoard = validateUserInput(userInput, playerTwoIcon);
}

let playerOneIcon = '○';
let playerTwoIcon = '●';
let chancesLeft = 5;

function takeUserInput() {
  console.log("-----------------------------------");
  playerOneInput();
  console.log(updatedBoard);

  if (setIndexes(updatedBoard)) {
    console.log("you won");
    return 0;
  }

  if (chancesLeft === 1) {
    console.log("game lost");
    return 0;
  }

  playerTwoInput();
  console.log(updatedBoard);

  chancesLeft = chancesLeft - 1;
  return takeUserInput();
}

let key = 0;
function validateUserInput(userInput, color) {
  let board = "";
  key = 0;
  for (let index = 0; index < updatedBoard.length; index++) {
    if (userInput == updatedBoard[index]) {
      board += color;
      key = 1;
    } else {
      board += updatedBoard[index];
    }
  }

  return board;
}

function getIndex(index) {
  return 13 * index;
}

function setIndexes(updatedBoard) {
  let sourceIndex = 89;

  const a1 = updatedBoard[sourceIndex];
  const a2 = updatedBoard[sourceIndex + getIndex(1)];
  const a3 = updatedBoard[sourceIndex + getIndex(2)];

  sourceIndex = 212;
  const b1 = updatedBoard[sourceIndex];
  const b2 = updatedBoard[sourceIndex + getIndex(1)];
  const b3 = updatedBoard[sourceIndex + getIndex(2)];

  sourceIndex = 335;
  const c1 = updatedBoard[sourceIndex];
  const c2 = updatedBoard[sourceIndex + getIndex(1)];
  const c3 = updatedBoard[sourceIndex + getIndex(2)];

  if (a1 === a2 && a1 === a3) {
    return true;
  }

  if (b1 === b2 && b1 === b3) {
    return true;
  }

  if (c1 === c2 && c1 === c3) {
    return true;
  }

  if (a1 === b1 && a1 === c1) {
    return true;
  }

  if (a2 === b2 && a2 === c2) {
    return true;
  }

  if (a3 === b3 && a3 === c3) {
    return true;
  }

  if (a1 === b2 && a1 === c3) {
    return true;
  }

  if (a3 === b2 && a3 === c1) {
    return true;
  }

  return false;
}

const sourceTable = getSourceTable();

let updatedBoard = sourceTable;

console.log(sourceTable);

takeUserInput();