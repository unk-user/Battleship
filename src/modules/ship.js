/* eslint-disable no-else-return */
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
    if (this.hits >= this.length) {
      this.sunk = true;
      return this.sunk;
    } else {
      return false;
    }
  }
}
