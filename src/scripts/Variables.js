import { InitBoard, InitKnight } from './Helpers.js';

// GLOBAL IMMUTABLE VARIABLES:
const boardSize = 8;
const boardDiv = document.getElementById('board');
const placeKnightBtn = document.getElementById('place-knight-btn');
const placeRandomKnightBtn = document.getElementById('place-random-knight-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const travailBtn = document.getElementById('travail-btn');
const selectDestinationBtn = document.getElementById('select-destination-btn');
const knightImg = document.getElementById('knight');
const notationNumbers = document.getElementById('notation-numbers');
const notationLetters = document.getElementById('notation-letters');
const knightInstance = InitKnight();
const moveAudio = document.getElementById('moveAudio');
// Render the board here:
const boardInstance = InitBoard();

export {
  boardSize,
  boardDiv,
  placeKnightBtn,
  placeRandomKnightBtn,
  startBtn,
  resetBtn,
  travailBtn,
  selectDestinationBtn,
  knightImg,
  notationNumbers,
  notationLetters,
  knightInstance,
  boardInstance,
  moveAudio,
};
