// GLOBAL VARIABLES:
const boardSize = 8;
const boardDiv = document.getElementById('board');
const placeKnightBtn = document.getElementById('place-knight-btn');
const placeRandomKnightBtn = document.getElementById('place-random-knight-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const selectDestinationBtn = document.getElementById('select-destination-btn');
const knightImg = document.getElementById('knight');
let isSelectingDestination = false;
let isPlacingKnight = false;

// CLASSES:
class Board {
  constructor() {
    this.board = [];
  }

  createBoard() {
    for (let i = 0; i < boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < boardSize; j++) {
        this.board[i].push(0);
      }
    }
  }

  renderBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const square = document.createElement('div');
        square.setAttribute('id', `${i}${j}`);
        square.classList.add('square');
        // set dark or white square
        if ((i + j) % 2 === 0) {
          square.classList.add('black');
        } else {
          square.classList.add('white');
        }
        square.addEventListener('click', SquareEvent);
        boardDiv.appendChild(square);
      }
    }
  }
}

class Knight {
  constructor() {
    this.visited = [];
    this.queue = [];
    this.path = [];
    this.start = [null, null];
    this.end = [null, null];
  }

  placeKnight(position) {
    this.start = position;
    const square = document.getElementById(`${position[0]}${position[1]}`);
    square.appendChild(knightImg);
    knightImg.classList.remove('hidden');
  }
}

// FUNCTIONALITY:
const boardInstance = new Board();
boardInstance.createBoard();
boardInstance.renderBoard();
const knightInstance = new Knight();

placeKnightBtn.addEventListener('click', () => {
  isPlacingKnight = true;
  isSelectingDestination = false;
});

selectDestinationBtn.addEventListener('click', () => {
  isSelectingDestination = true;
  isPlacingKnight = false;
});

resetBtn.addEventListener('click', () => {
  isPlacingKnight = false;
  isSelectingDestination = false;
  knightInstance.start = [null, null];
  knightInstance.end = [null, null];
  knightInstance.visited = [];
  knightInstance.queue = [];
  knightInstance.path = [];
  knightImg.classList.add('hidden');
  const previousDestination = document.querySelector('.destination');
  if (previousDestination) {
    previousDestination.classList.remove('destination');
  }
});

placeRandomKnightBtn.addEventListener('click', () => {
  isPlacingKnight = false;
  isSelectingDestination = false;
  let randomPosition = randomPositionHelper();

  while (
    randomPosition[0] === parseInt(knightInstance.end[0]) &&
    randomPosition[1] === parseInt(knightInstance.end[1])
  ) {
    randomPosition = randomPositionHelper();
  }

  knightInstance.placeKnight(randomPosition);
});

function randomPositionHelper() {
  const randomRow = Math.floor(Math.random() * boardSize);
  const randomCol = Math.floor(Math.random() * boardSize);
  return [randomRow, randomCol];
}

function SquareEvent() {
  if (isPlacingKnight) {
    PlaceKnight(this.id);
  }

  if (isSelectingDestination) {
    SelectDestination(this.id);
  }
}

function PlaceKnight(id) {
  // knight cant be set on destination
  if (id === `${knightInstance.end[0]}${knightInstance.end[1]}`) {
    return;
  }
  const position = id.split('');
  knightInstance.placeKnight(position);
  isPlacingKnight = false;
}

function SelectDestination(id) {
  // destination cant be the same as start
  if (id === `${knightInstance.start[0]}${knightInstance.start[1]}`) {
    return;
  }

  // remove previous destination if exists
  const previousDestination = document.querySelector('.destination');
  if (previousDestination) {
    previousDestination.classList.remove('destination');
  }

  const square = document.getElementById(`${id}`);
  square.classList.add('destination');
  const position = id.split('');
  knightInstance.end = position;
  isSelectingDestination = false;
}
