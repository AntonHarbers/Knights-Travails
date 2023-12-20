import { boardSize, knightImg, moveAudio } from '../Variables.js';

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
    moveAudio.play();
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
    const dx = [2, 2, -2, -2, 1, 1, -1, -1];
    const dy = [1, -1, 1, -1, 2, -2, 2, -2];

    this.initPathQueueVisited();

    while (this.queue.length > 0) {
      const current = this.queue.shift();

      if (current[0] === this.end[0] && current[1] === this.end[1]) {
        return this.reconstructPath(current);
      }

      for (let i = 0; i < dx.length; i++) {
        const nextX = current[0] + dx[i];
        const nextY = current[1] + dy[i];

        if (this.isValidMove(nextX, nextY)) {
          this.queue.push([nextX, nextY]);
          this.visited[nextX][nextY] = current;
        }
      }
    }

    return [];
  }

  // knight moves helpers
  isValidMove(x, y) {
    return (
      x >= 0 && x < boardSize && y >= 0 && y < boardSize && !this.visited[x][y]
    );
  }

  initPathQueueVisited() {
    this.path = [];
    this.queue = [];
    this.clearVisited();
    this.queue.push(this.start);
    this.visited[this.start[0]][this.start[1]] = true;
  }

  reconstructPath(current) {
    const path = [current];
    while (current[0] !== this.start[0] || current[1] !== this.start[1]) {
      current = this.visited[current[0]][current[1]];
      path.push(current);
    }
    return path.reverse();
  }
}

export default Knight;
