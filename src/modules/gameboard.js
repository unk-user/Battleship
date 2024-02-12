/* eslint-disable no-else-return */
import Ship from './ship';

export default class GameBoard {
  constructor() {
    this.board = this.initialiseBoard();
    this.hitMap = new Set();
  }

  initialiseBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push(new Array(10).fill(null));
    }
    return board;
  }

  placeShip(coords, rotation, length) {
    const [x, y] = coords;
    const ship = new Ship(length);
    if (!this.isValidPlacement(coords, rotation, length)) return false;
    if (rotation === 'H') {
      for (let i = 0; i < length; i++) {
        this.board[x + i][y] = ship;
      }
      return true;
    } else if (rotation === 'V') {
      for (let i = 0; i < length; i++) {
        this.board[x][y + i] = ship;
      }
      return true;
    }
  }

  isValidPlacement(coords, rotation, length) {
    const [x, y] = coords;
    if (rotation === 'H') {
      for (let i = 0; i < length; i++) {
        if (x + i >= 10 || this.board[x + i][y]) return false;
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (y + i >= 10 || this.board[x][y + i]) return false;
      }
    }
    return this.areaClear(x, y, rotation, length);
  }

  areaClear(x, y, rotation, length) {
    const minX = Math.max(x - 1, 0);
    let maxX = Math.min(x + length, 9);
    const minY = Math.max(y - 1, 0);
    let maxY = Math.min(y + 1, 9);
    if (rotation === 'V') {
      maxY = Math.min(y + length, 9);
      maxX = Math.min(x + 1, 9);
    }
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (this.board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    if (!this.hitMap.has(`${x}${y}`)) {
      this.hitMap.add(`${x}${y}`);
      if (this.board[x][y]) {
        this.board[x][y].hit();
        this.board[x][y].isSunk();
        return 'hit';
      }
    }
    return false;
  }
}
