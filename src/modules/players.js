import GameBoard from './gameboard';

export const playerBoard = new GameBoard();
export const computerBoard = new GameBoard();

export const playerTurn = (x, y) => {
  computerBoard.receiveAttack([x, y]);
  return true;
};

export const computerTurn = (x, y, remainingTurns = 100) => {
  if (remainingTurns <= 0) return;
  const a = Math.floor(Math.random() * 9);
  const b = Math.floor(Math.random() * 9);
  if (!playerBoard.hitMap.has(`${a}${b}`)) {
    return playerBoard.receiveAttack([a, b]);
  }
  computerTurn(remainingTurns - 1);
};
