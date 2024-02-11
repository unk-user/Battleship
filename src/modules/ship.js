class Ship {
  constructor(length, hits = 0) {
    this.length = length;
    this.hits = hits;
    this.Sunk = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
export default Ship;
