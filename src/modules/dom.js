/* eslint-disable no-param-reassign */
import Game from './game';

class DOMInteractions {
  constructor() {
    this.game = new Game();
  }
}
const dom = new DOMInteractions();
dom.intialiseGrid();
