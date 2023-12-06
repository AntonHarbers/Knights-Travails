import {
  boardSize,
  boardDiv,
  notationNumbers,
  notationLetters,
} from '../Variables.js';

import {
  PlaceKnight,
  isPlacingKnight,
  isSelectingDestination,
  SelectDestination,
} from '../script.js';

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
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.remove();
    });
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

  renderNotation() {
    for (let i = 8; i > 0; i--) {
      const number = document.createElement('div');
      number.classList.add('notation');
      number.innerText = `${i}`;
      notationNumbers.appendChild(number);
    }

    for (let i = 0; i < boardSize; i++) {
      const letter = document.createElement('div');
      letter.classList.add('notation');
      letter.innerText = `${String.fromCharCode(97 + i)}`;
      notationLetters.appendChild(letter);
    }
  }
}

// Square Event added to each square in renderBoard()
function SquareEvent() {
  if (isPlacingKnight) {
    PlaceKnight(this.id);
  }

  if (isSelectingDestination) {
    SelectDestination(this.id);
  }
}

export default Board;
