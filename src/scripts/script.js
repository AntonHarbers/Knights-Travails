import {
  resetBtn,
  placeRandomKnightBtn,
  travailBtn,
  placeKnightBtn,
  selectDestinationBtn,
  knightImg,
  knightInstance,
  boardInstance,
  moveAudio,
} from './Variables.js';
import { randomPositionHelper } from './Helpers.js';

let isSelectingDestination = false;
let isPlacingKnight = false;

// Event Listeners

placeKnightBtn.addEventListener('click', () => {
  isPlacingKnight = true;
  isSelectingDestination = false;
});

selectDestinationBtn.addEventListener('click', () => {
  isSelectingDestination = true;
  isPlacingKnight = false;
});

resetBtn.addEventListener('click', () => {
  resetState();
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

travailBtn.addEventListener('click', () => {
  isPlacingKnight = false;
  isSelectingDestination = false;
  StartPathfinding();
});

// Functions

function StartPathfinding() {
  if (knightInstance.start[0] === null || knightInstance.end[0] === null) {
    alert('Please select a start and end point');
    return;
  }
  const shortestPath = knightInstance.knightMoves();
  animateKnightAlongShortestPath(shortestPath);
}

function animateKnightAlongShortestPath(path) {
  let i = 0;
  const knightImageMoveInterval = setInterval(() => {
    if (i < path.length) {
      if (i != path.length && i != 0) {
        moveAudio.play();
      }
      const square = document.getElementById(`${path[i][0]}${path[i][1]}`);
      square.appendChild(knightImg);
      square.classList.add('travelled');
      square.style.backgroundColor = `rgba(0, 255, 0, ${i / path.length})`;
      knightInstance.start = path[i];
      i++;
    } else {
      clearInterval(knightImageMoveInterval);
    }
  }, 350);
}

function resetState() {
  isPlacingKnight = false;
  isSelectingDestination = false;
  knightInstance.start = [null, null];
  knightInstance.end = [null, null];
  knightInstance.clearVisited();
  knightInstance.queue = [];
  knightInstance.path = [];
  knightImg.classList.add('hidden');
  boardInstance.renderBoard();
}

function PlaceKnight(id) {
  // knight cant be set on destination
  if (id === `${knightInstance.end[0]}${knightInstance.end[1]}`) {
    return;
  }

  const position = id.split('');
  knightInstance.placeKnight([parseInt(position[0]), parseInt(position[1])]);
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
  knightInstance.end = [parseInt(position[0]), parseInt(position[1])];
  isSelectingDestination = false;
}

export {
  PlaceKnight,
  SelectDestination,
  isPlacingKnight,
  isSelectingDestination,
};
