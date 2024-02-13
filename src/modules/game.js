/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import GameBoard from './gameboard';

export default class Game {
  constructor() {
    this.playerBoard = new GameBoard();
    this.computerBoard = new GameBoard();
    this.playerShips = [];
    this.computerShips = [];
    this.queue = [];
    this.shipLengths = [2, 2, 3, 4, 4];
  }

  playerTurn(x, y) {
    setTimeout(() => {
      this.computerTurn();
    }, 100);
    this.computerBoard.receiveAttack([x, y]);
    return this.checkWinner();
  }

  enqueueNeighbours(x, y, lastX = undefined, lastY = undefined) {
    if (lastY !== undefined && lastY !== undefined) {
      const newCoords = [x + x - lastX, y + y - lastY];
      this.queue = [];
      this.queue.push({ coords: newCoords, last: [x, y] });
      return 'hit';
    }
    const a = x + 1;
    const b = x - 1;
    const c = y + 1;
    const d = y - 1;

    if (c < 10 && !this.playerBoard.hitMap.has(`${x}${c}`)) this.queue.push({ coords: [x, c], last: [x, y] });
    if (d >= 0 && !this.playerBoard.hitMap.has(`${x}${d}`)) this.queue.push({ coords: [x, d], last: [x, y] });
    if (a < 10 && !this.playerBoard.hitMap.has(`${a}${y}`)) this.queue.push({ coords: [a, y], last: [x, y] });
    if (b >= 0 && !this.playerBoard.hitMap.has(`${b}${y}`)) this.queue.push({ coords: [b, y], last: [x, y] });
    return 'hit';
  }

  computerTurn(x = undefined, y = undefined, remainingTurns = 100) {
    let a = Math.floor(Math.random() * 9);
    let b = Math.floor(Math.random() * 9);
    if (remainingTurns <= 0) return;
    if (x !== undefined && y !== undefined) {
      this.playerBoard.receiveAttack([x, y]) ? this.enqueueNeighbours(x, y) : false;
      return this.checkWinner();
    }
    if (this.queue.length > 0) {
      const queueTurn = this.queue.shift();
      [a, b] = queueTurn.coords;
      const [lastX, lastY] = queueTurn.last;
      this.playerBoard.receiveAttack([a, b]) ? this.enqueueNeighbours(a, b, lastX, lastY) : false;
      return this.checkWinner();
    }
    if (!this.playerBoard.hitMap.has(`${a}${b}`)) {
      this.playerBoard.receiveAttack([a, b]) ? this.enqueueNeighbours(a, b) : false;
      return this.checkWinner();
    }
    this.computerTurn(remainingTurns - 1);
    return this.checkWinner();
  }

  initializeBoards() {
    for (let i = 0; i < this.shipLengths.length; i++) {
      let isValidPlacement = false;
      let x;
      let y;
      while (!isValidPlacement) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (this.playerBoard.isValidPlacement([x, y], 'H', this.shipLengths[i])) {
          isValidPlacement = this.playerBoard.placeShip([x, y], 'H', this.shipLengths[i]);
        }
      }
      this.playerShips.push(this.playerBoard.board[x][y]);
      isValidPlacement = false;
      while (!isValidPlacement) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (this.computerBoard.isValidPlacement([x, y], 'V', this.shipLengths[i])) {
          isValidPlacement = this.computerBoard.placeShip([x, y], 'V', this.shipLengths[i]);
        }
      }
      this.computerShips.push(this.computerBoard.board[x][y]);
    }
  }

  checkWinner() {
    let playerSunk = 0;
    let computersunk = 0;
    this.refreshGrid();
    this.playerShips.forEach((ship) => {
      if (ship.sunk === true) {
        playerSunk++;
      }
    });
    if (playerSunk >= this.playerShips.length) {
      return 'Computer won';
    }
    this.computerShips.forEach((ship) => {
      if (ship.sunk === true) {
        computersunk++;
      }
    });
    if (computersunk >= this.computerShips.length) {
      return 'playerWon';
    }
    return 'next Turn';
  }

  initializeGrid() {
    this.initializeBoards();
    const playerGrid = document.querySelector('#player-board');
    const computerGrid = document.querySelector('#computer-board');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const playerDiv = document.createElement('div');
        const computerDiv = document.createElement('div');
        playerDiv.classList = 'square player-square';
        computerDiv.classList = 'square computer-square';
        if (this.playerBoard.board[i][j]) {
          playerDiv.setAttribute('id', 'ship');
        }
        if (this.computerBoard.board[i][j]) {
          computerDiv.setAttribute('id', 'ship');
        }
        computerDiv.addEventListener('click', () => {
          this.playerTurn(j, i);
        });
        playerGrid.appendChild(playerDiv);
        computerGrid.appendChild(computerDiv);
      }
    }
  }

  refreshGrid() {
    const computerSquares = document.querySelectorAll('.computer-square');
    const playerSquares = document.querySelectorAll('.player-square');

    computerSquares.forEach((square, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      if (this.computerBoard.hitMap.has(`${x}${y}`)) {
        square.classList.add('hit');
      }
    });
    playerSquares.forEach((square, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      if (this.playerBoard.hitMap.has(`${x}${y}`)) {
        square.classList.add('hit');
      }
    });
  }
}

const game = new Game();
game.initializeGrid();
