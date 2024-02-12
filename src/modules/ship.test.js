import Ship from './ship';

describe('Ship', () => {
  let testShip;
  let testShipTwo;

  beforeEach(() => {
    testShip = new Ship(1);
    testShipTwo = new Ship(2);
  });

  test('increases hits', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
    testShip.hit();
    expect(testShip.hits).toBe(2);
  });
  test('checks for sunken ship', () => {
    testShip.hit();
    testShipTwo.hit();
    expect(testShip.isSunk()).toBe(true);
    expect(testShipTwo.isSunk()).toBe(false);
  });
});
