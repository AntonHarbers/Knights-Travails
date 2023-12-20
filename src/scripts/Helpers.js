import { boardSize } from './Variables.js';
import Knight from './Classes/Knight.js';
import Board from './Classes/Board.js';

function randomPositionHelper() {
  const randomPos = [
    Math.floor(Math.random() * boardSize),
    Math.floor(Math.random() * boardSize),
  ];
  return randomPos;
}

const InitKnight = () => {
  let knight = new Knight();
  knight.initializeVisited();
  return knight;
};

const InitBoard = () => {
  let board = new Board();
  board.createBoard();
  board.renderBoard();
  board.renderNotation();
  return board;
};

export { randomPositionHelper, InitKnight, InitBoard };
