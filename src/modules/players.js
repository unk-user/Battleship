import GameBoard from './gameboard';

export const playerBoard = new GameBoard();
export const computerBoard = new GameBoard();

export const playerTurn = (x, y) => {
  computerBoard.receiveAttack([x, y]);
  return true;
};

let queue = [];

const enqueueNeighbours = (x, y, lastX = undefined, lastY = undefined) => {
  if (lastY !== undefined && lastY !== undefined) {
    const newCoords = [x + x - lastX, y + y - lastY];
    queue = [];
    queue.push({ coords: newCoords, last: [x, y] });
    return 'hit';
  }
  const a = x + 1;
  const b = x - 1;
  const c = y + 1;
  const d = y - 1;

  if (c < 10 && !playerBoard.hitMap.has(`${x}${c}`)) queue.push({ coords: [x, c], last: [x, y] });
  if (d >= 0 && !playerBoard.hitMap.has(`${x}${d}`)) queue.push({ coords: [x, d], last: [x, y] });
  if (a < 10 && !playerBoard.hitMap.has(`${a}${y}`)) queue.push({ coords: [a, y], last: [x, y] });
  if (b >= 0 && !playerBoard.hitMap.has(`${b}${y}`)) queue.push({ coords: [b, y], last: [x, y] });
  return 'hit';
};

export const computerTurn = (x = undefined, y = undefined, remainingTurns = 100) => {
  let a = Math.floor(Math.random() * 9);
  let b = Math.floor(Math.random() * 9);
  if (remainingTurns <= 0) return;
  if (x !== undefined && y !== undefined) {
    return playerBoard.receiveAttack([x, y]) ? enqueueNeighbours(x, y) : false;
  }
  if (queue.length > 0) {
    const queueTurn = queue.shift();
    [a, b] = queueTurn.coords;
    const [lastX, lastY] = queueTurn.last;
    return playerBoard.receiveAttack([a, b]) ? enqueueNeighbours(a, b, lastX, lastY) : false;
  }
  if (!playerBoard.hitMap.has(`${a}${b}`)) {
    return playerBoard.receiveAttack([a, b]) ? enqueueNeighbours(a, b) : false;
  }
  computerTurn(remainingTurns - 1);
};
