import Ship from './ship';

describe('Ship', () => {
  let testShip;
  let testShipTwo;

  beforeEach(() => {
    testShip = new Ship(1);
    testShipTwo = new Ship(2);
  });

  test('hit method is working', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
    testShip.hit();
    expect(testShip.hits).toBe(2);
  });
  test('isSunk method is working', () => {
    testShip.hit();
    testShipTwo.hit();
    expect(testShip.isSunk()).toBe(true);
    expect(testShipTwo.isSunk()).toBe(false);
  });
});
