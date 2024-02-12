import { playerBoard, computerBoard, playerTurn, computerTurn } from './players';

describe('playerTurn', () => {
  beforeEach(() => {
    computerBoard.placeShip([0, 0], 'V', 4);
    computerBoard.placeShip([2, 0], 'V', 4);
    computerBoard.placeShip([4, 0], 'V', 3);
    computerBoard.placeShip([7, 0], 'V', 3);
    playerTurn(0, 0);
    playerTurn(4, 0);
    playerTurn(4, 1);
    playerTurn(4, 2);
  });
  test('player can attack computer board', () => {
    expect(computerBoard.board[0][0]).toEqual({ length: 4, hits: 1, sunk: false });
  });
  test('player can sink computer ship', () => {
    expect(computerBoard.board[4][0]).toEqual({ length: 3, hits: 3, sunk: true });
  });
});

describe('computerTurn', () => {
  beforeEach(() => {
    playerBoard.placeShip([0, 0], 'V', 4);
    playerBoard.placeShip([2, 0], 'V', 4);
    playerBoard.placeShip([4, 0], 'V', 3);
    playerBoard.placeShip([6, 0], 'V', 3);
  });

  test('computer can play a position randomly', () => {
    expect(computerTurn()).toBe('hit');
  });
});
