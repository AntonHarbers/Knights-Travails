// GLOBAL VARIABLES:

const boardDiv = document.getElementById('board');

// CLASSES:

class Board{
    constructor(){
        this.board = [];
    }

    createBoard(){
        for(let i = 0; i < 8; i++){
            this.board.push([]);
            for(let j = 0; j < 8; j++){
                this.board[i].push(0);
            }
        }
    }

    renderBoard(){
        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board[i].length; j++){
                const square = document.createElement('div');
                square.setAttribute('id', `${i}${j}`);
                square.classList.add('square');
                // set dark or white square
                if((i + j) % 2 === 0){
                    square.classList.add('black');
                } else {
                    square.classList.add('white');
                }
                boardDiv.appendChild(square);
            }
        }
    }

}

class Knight{
    constructor() {
        this.visited = [];
        this.queue = [];
        this.path = [];
        this._start = [null, null];
        this._end = [null, null];
    }

    get start(){
        return this.start;
    }

    get end(){
        return this.end;
    }

    set start(start){
        this._start = start;
    }

    set end(end){
        this._end = end;
    }
}

// FUNCTIONALITY:

const boardInstance = new Board();
boardInstance.createBoard();
boardInstance.renderBoard();

const knightInstance = new Knight();
knightInstance.start = [1,1]


