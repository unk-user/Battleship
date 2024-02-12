export default class Ship {
  constructor(length, hits = 0) {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
