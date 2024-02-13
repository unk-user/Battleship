import Game from './game';

const players = new Game();
describe('playerTurn', () => {
  beforeEach(() => {
    players.computerBoard.placeShip([0, 0], 'V', 4);
    players.computerBoard.placeShip([2, 0], 'V', 4);
    players.computerBoard.placeShip([4, 0], 'V', 3);
    players.computerBoard.placeShip([7, 0], 'V', 3);
    players.playerTurn(0, 0);
    players.playerTurn(4, 0);
    players.playerTurn(4, 1);
    players.playerTurn(4, 2);
  });
  test('player can attack computer board', () => {
    expect(players.computerBoard.board[0][0]).toEqual({ length: 4, hits: 1, sunk: false });
  });
  test('player can sink computer ship', () => {
    expect(players.computerBoard.board[4][0]).toEqual({ length: 3, hits: 3, sunk: true });
  });
});

describe('computerTurn', () => {
  beforeEach(() => {
    players.playerBoard.placeShip([0, 0], 'V', 4);
    players.playerBoard.placeShip([2, 0], 'V', 4);
    players.playerBoard.placeShip([4, 0], 'V', 3);
    players.playerBoard.placeShip([6, 0], 'V', 3);
    players.computerTurn(0, 0);
    players.computerTurn();
  });

  test('computer chooses neighbours of previous hit position', () => {
    expect(players.playerBoard.board[0][0]).toEqual({ length: 4, hits: 2, sunk: false });
    expect(players.computerTurn()).toBe('hit');
  });
});
