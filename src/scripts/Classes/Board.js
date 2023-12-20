import {
  boardSize,
  boardDiv,
  notationNumbers,
  notationLetters,
} from '../Variables.js';

import { PlaceKnight, isPlacingKnight, SelectDestination } from '../script.js';

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
    ClearAllSquares();
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        boardDiv.appendChild(CreateSquare(i, j));
      }
    }
  }

  renderNotation() {
    for (let i = 8; i > 0; i--) {
      notationNumbers.appendChild(CreateNotationElement(i, true));
    }

    for (let i = 0; i < boardSize; i++) {
      notationLetters.appendChild(CreateNotationElement(i, false));
    }
  }
}

// Helper Functions
function ClearAllSquares() {
  while (boardDiv.firstChild) {
    boardDiv.removeChild(boardDiv.firstChild);
  }
}

function CreateNotationElement(i, isNum) {
  const element = document.createElement('div');
  element.classList.add('notation');
  element.innerText = isNum ? `${i}` : `${String.fromCharCode(97 + i)}`;
  return element;
}

function CreateSquare(i, j) {
  const square = document.createElement('div');
  const squareId = `${i}${j}`;
  square.setAttribute('id', squareId);
  square.classList.add('square');
  square.classList.add((i + j) % 2 === 0 ? 'black' : 'white');
  square.addEventListener('click', () =>
    isPlacingKnight ? PlaceKnight(squareId) : SelectDestination(squareId)
  );
  return square;
}

export default Board;
