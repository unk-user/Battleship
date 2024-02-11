import Ship from './ship';

describe('Ship', () => {
  let testShip;
  let testShipTwo;

  beforeEach(() => {
    testShip = new Ship(1);
    testShipTwo = new Ship(2);
  });

  test('the ship got hit', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });
  test('the ship sunk', () => {
    testShip.hit();
    testShipTwo.hit();
    expect(testShip.isSunk()).toBe(true);
    expect(testShipTwo.isSunk()).toBe(false);
  });
});
