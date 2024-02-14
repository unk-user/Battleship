/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import GameBoard from './gameboard';

export default class Game {
  static playerBoard = null;

  static computerBoard = null;

  static playerShips = [];

  static computerShips = [];

  static queue = [];

  static selectionShips = [2, 2, 3, 4, 4];

  static selectedShipIndex = 0;

  static playerDirection = 'H';

  static end = true;

  playerTurn(x, y) {
    if (this.end) return;
    if (!this.computerBoard.hitMap.has(`${x}${y}`)) {
      setTimeout(() => {
        this.computerTurn();
      }, 100);
      this.computerBoard.receiveAttack([x, y]);
      return this.checkWinner();
    }
  }

  static enqueueNeighbours(x, y, lastX = undefined, lastY = undefined) {
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

  static computerTurn(x = undefined, y = undefined, remainingTurns = 100) {
    if (this.end) return;
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
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

  static initializeBoards() {
    this.computerShips = [];
    this.playerShips = [];
    this.playerBoard = new GameBoard();
    this.computerBoard = new GameBoard();
    const shipLengths = [2, 2, 3, 4, 4];
    const directions = ['H', 'V'];
    for (let i = 0; i < shipLengths.length; i++) {
      let isValidPlacement = false;
      let x;
      let y;
      const direction = directions[Math.floor(Math.random() * 2)];
      while (!isValidPlacement) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (this.computerBoard.isValidPlacement([x, y], direction, shipLengths[i])) {
          isValidPlacement = this.computerBoard.placeShip([x, y], direction, shipLengths[i]);
        }
      }
      this.computerShips.push(this.computerBoard.board[x][y]);
    }
  }

  static checkWinner() {
    const stateMsg = document.querySelector('#message');
    let playerSunk = 0;
    let computersunk = 0;
    this.refreshGrid();
    this.playerShips.forEach((ship) => {
      if (ship.sunk === true) {
        playerSunk++;
      }
    });
    if (playerSunk >= this.playerShips.length) {
      stateMsg.textContent = 'Computer won';
      this.end = true;
      return;
    }
    this.computerShips.forEach((ship) => {
      if (ship.sunk === true) {
        computersunk++;
      }
    });
    if (computersunk >= this.computerShips.length) {
      stateMsg.textContent = 'playerWon';
      this.end = true;
      return;
    }
    stateMsg.textContent = 'next Turn';
  }

  static initializeGrid() {
    const playerGrid = document.querySelector('#player-board');
    const computerGrid = document.querySelector('#computer-board');
    playerGrid.innerHTML = '';
    computerGrid.innerHTML = '';
    const stateMsg = document.querySelector('#message');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const playerDiv = document.createElement('div');
        const computerDiv = document.createElement('div');
        playerDiv.classList = 'gridCell player-square';
        computerDiv.classList = 'gridCell computer-square';
        computerDiv.addEventListener('click', () => {
          this.playerTurn(j, i);
        });
        playerDiv.addEventListener('click', () => {
          this.placeSelectedShip([j, i]);
        });
        if (this.computerBoard.board[j][i]) {
          computerDiv.setAttribute('id', 'ship');
        }
        playerGrid.appendChild(playerDiv);
        computerGrid.appendChild(computerDiv);
      }
    }
    stateMsg.textContent = 'player turn';
  }

  static refreshGrid() {
    const computerSquares = document.querySelectorAll('.computer-square');
    const playerSquares = document.querySelectorAll('.player-square');

    computerSquares.forEach((gridCell, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      if (this.computerBoard.hitMap.has(`${x}${y}`) && this.computerBoard.board[x][y]) {
        gridCell.style.backgroundColor = 'cyan';
      } else if (this.computerBoard.hitMap.has(`${x}${y}`)) {
        gridCell.classList.add('hit');
      }
    });
    playerSquares.forEach((gridCell, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      if (this.playerBoard.board[x][y]) {
        gridCell.setAttribute('id', 'ship');
      }
      if (this.playerBoard.hitMap.has(`${x}${y}`) && this.playerBoard.board[x][y]) {
        gridCell.style.backgroundColor = 'cyan';
      } else if (this.playerBoard.hitMap.has(`${x}${y}`)) {
        gridCell.classList.add('hit');
      }
    });
  }

  static activateGameControls() {
    const play = document.querySelector('#play');
    const replay = document.querySelector('#replay');
    this.selectionShips = [2, 2, 3, 4, 4];
    replay.addEventListener('click', () => {
      this.initializeBoards();
      this.initializeGrid();
    });
    play.addEventListener('click', () => {
      this.end = false;
      this.refreshGrid();
    });
    document.addEventListener('keypress', (e) => {
      if (e.key === 'R' || e.key === 'r') {
        this.playerDirection = this.playerDirection === 'H' ? 'V' : 'H';
      }
    });
  }

  static placeSelectedShip(coords) {
    const [x, y] = coords;
    if (!this.end) return;
    if (this.selectionShips.length <= 0) return;
    const length = this.selectionShips[this.selectedShipIndex];
    if (this.playerBoard.placeShip(coords, this.playerDirection, length)) {
      this.playerShips.push(this.playerBoard.board[x][y]);
      this.selectionShips.splice(this.selectedShipIndex, 1);
    }
    this.initializeGrid();
    this.refreshGrid();
  }

  static selectShip() {
    const shipVariants = document.querySelectorAll('.shipType');
    shipVariants.forEach((variantBtn, index) => {
      variantBtn.addEventListener('click', () => {
        this.selectedShipIndex = this.selectionShips.indexOf(index + 2);
      });
    });
  }
}
