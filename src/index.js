import Game from './modules/game';

document.addEventListener('DOMContentLoaded', () => {
  Game.initializeBoards();
  Game.initializeGrid();
  Game.activateGameControls();
});
