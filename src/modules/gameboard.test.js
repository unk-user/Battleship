import GameBoard from './gameboard';

describe('ship placement', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new GameBoard();
  });

  test('can place ships horizontally', () => {
    gameboard.placeShip([5, 5], 'H', 4);
    expect(gameboard.board[5][5]).toEqual({ length: 4, hits: 0, sunk: false });
    expect(gameboard.board[6][5]).toEqual({ length: 4, hits: 0, sunk: false });
    expect(gameboard.board[7][5]).toEqual({ length: 4, hits: 0, sunk: false });
    expect(gameboard.board[8][5]).toEqual({ length: 4, hits: 0, sunk: false });
  });
  test('can place ships vertically', () => {
    gameboard.placeShip([2, 2], 'V', 3);
    expect(gameboard.placeShip([6, 1], 'V', 4)).toBe(true);
    expect(gameboard.board[2][2]).toEqual({ length: 3, hits: 0, sunk: false });
    expect(gameboard.board[2][3]).toEqual({ length: 3, hits: 0, sunk: false });
    expect(gameboard.board[2][4]).toEqual({ length: 3, hits: 0, sunk: false });
  });

  test('prevents placing ships outside board', () => {
    expect(gameboard.placeShip([8, 6], 'H', 4)).toBe(false);
    expect(gameboard.placeShip([3, 9], 'V', 3)).toBe(false);
  });

  test('prevents placing ships on taken fields', () => {
    gameboard.placeShip([2, 5], 'H', 4);
    expect(gameboard.placeShip([1, 5], 'H', 4)).toBe(false);
  });
  test('prevents placing ships near taken fields', () => {
    gameboard.placeShip([1, 5], 'H', 4);
    expect(gameboard.board[1][5]).toEqual({ length: 4, hits: 0, sunk: false });
    expect(gameboard.placeShip([2, 4], 'H', 4)).toBe(false);
  });
});

describe('receive an attack', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new GameBoard();
    gameboard.placeShip([5, 5], 'V', 4);
    gameboard.receiveAttack([5, 6]);
  });

  test('increases hits', () => {
    expect(gameboard.board[5][5]).toEqual({ length: 4, hits: 1, sunk: false });
    expect(gameboard.receiveAttack([6, 5])).toBe(false);
  });
});
