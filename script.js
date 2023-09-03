// GLOBAL VARIABLES:
const boardSize = 8;
const boardDiv = document.getElementById("board");
const placeKnightBtn = document.getElementById("place-knight-btn");
const placeRandomKnightBtn = document.getElementById("place-random-knight-btn");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const travailBtn = document.getElementById("travail-btn");
const selectDestinationBtn = document.getElementById("select-destination-btn");
const knightImg = document.getElementById("knight");
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
        const square = document.createElement("div");
        square.setAttribute("id", `${i}${j}`);
        square.classList.add("square");
        // set dark or white square
        if ((i + j) % 2 === 0) {
          square.classList.add("black");
        } else {
          square.classList.add("white");
        }
        square.addEventListener("click", SquareEvent);
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
    knightImg.classList.remove("hidden");
  }

  initializeVisited() {
    for (let i = 0; i < boardSize; i++) {
      this.visited.push([]);
      for (let j = 0; j < boardSize; j++) {
        this.visited[i].push(false);
      }
    }
  }

  clearVisited() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        this.visited[i][j] = false;
      }
    }
  }

  knightMoves() {
    // clear path and queue and visited
    this.path = [];
    this.queue = [];
    this.clearVisited();

    const dx = [2, 2, -2, -2, 1, 1, -1, -1];
    const dy = [1, -1, 1, -1, 2, -2, 2, -2];

    this.queue.push(this.start);
    this.visited[this.start[0]][this.start[1]] = true;

    while (this.queue.length > 0) {
      const current = this.queue.shift();

      if (current[0] === this.end[0] && current[1] === this.end[1]) {
        this.path.push(current);
        break;
      }

      for (let i = 0; i < 8; i++) {
        const nextX = current[0] + dx[i];
        const nextY = current[1] + dy[i];

        if (
          nextX >= 0 &&
          nextX < boardSize &&
          nextY >= 0 &&
          nextY < boardSize &&
          !this.visited[nextX][nextY]
        ) {
          this.queue.push([nextX, nextY]);
          this.visited[nextX][nextY] = current;
        }

        console.log(this.visited)
      }
    }

    if (this.path.length > 0) {
      const path = [this.end];
      let current = this.end;

      while (current[0] !== this.start[0] || current[1] !== this.start[1]) {
        current = this.visited[current[0]][current[1]];
        path.push(current);
      }
      return path.reverse();
    } else {
      return [];
    }
  }
}

// FUNCTIONALITY:
const boardInstance = new Board();
boardInstance.createBoard();
boardInstance.renderBoard();
const knightInstance = new Knight();
knightInstance.initializeVisited();

placeKnightBtn.addEventListener("click", () => {
  isPlacingKnight = true;
  isSelectingDestination = false;
});

selectDestinationBtn.addEventListener("click", () => {
  isSelectingDestination = true;
  isPlacingKnight = false;
});

resetBtn.addEventListener("click", () => {
  resetState();
});

placeRandomKnightBtn.addEventListener("click", () => {
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

travailBtn.addEventListener("click", () => {
  isPlacingKnight = false;
  isSelectingDestination = false;
  StartPathfinding();
});

function randomPositionHelper() {
  const randomRow = Math.floor(Math.random() * boardSize);
  const randomCol = Math.floor(Math.random() * boardSize);
  return [randomRow, randomCol];
}

function resetState(){
  isPlacingKnight = false;
  isSelectingDestination = false;
  knightInstance.start = [null, null];
  knightInstance.end = [null, null];
  knightInstance.clearVisited();
  knightInstance.queue = [];
  knightInstance.path = [];
  knightImg.classList.add("hidden");
  const previousDestination = document.querySelector(".destination");
  if (previousDestination) {
    previousDestination.classList.remove("destination");
  }

  // remove travelled class from squares
  const travelledSquares = document.querySelectorAll(".travelled");
  travelledSquares.forEach((square) => {
    square.classList.remove("travelled");
  }
  );
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
  const position = id.split("");
  knightInstance.placeKnight([parseInt(position[0]), parseInt(position[1])]);
  isPlacingKnight = false;
}

function SelectDestination(id) {
  // destination cant be the same as start
  if (id === `${knightInstance.start[0]}${knightInstance.start[1]}`) {
    return;
  }

  // remove previous destination if exists
  const previousDestination = document.querySelector(".destination");
  if (previousDestination) {
    previousDestination.classList.remove("destination");
  }

  const square = document.getElementById(`${id}`);
  square.classList.add("destination");
  const position = id.split("");
  knightInstance.end = [parseInt(position[0]), parseInt(position[1])];
  isSelectingDestination = false;
}

function StartPathfinding() {
  if (knightInstance.start[0] === null || knightInstance.end[0] === null) {
    alert("Please select a start and end point");
    return;
  }
  const shortestPath = knightInstance.knightMoves();
  animateKnightAlongShortestPath(shortestPath);
}

function animateKnightAlongShortestPath(path){
  let i = 0;
  const interval = setInterval(() => {
    if (i < path.length) {
      const square = document.getElementById(`${path[i][0]}${path[i][1]}`);
      square.appendChild(knightImg);
      // make the squares that have been travelled red
      square.classList.add("travelled");
      i++;
    } else {
      clearInterval(interval);
    }
  }, 500);
}
