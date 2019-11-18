/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
(() => {
  // MODEL
  // -------------------------------------------------------
  // DS for game
  let currentGame;
  class Game {
    constructor() {
      this._turn = 1;
      this._size = 3;
      this._openMoveCellChar = '_';

      const emptyGrid = [];
      for (let i = 0; i < this._size; i += 1) {
        emptyGrid.push([]);
        for (let j = 0; j < this._size; j += 1) {
          emptyGrid[i].push(this._openMoveCellChar);
        }
      }
      this._grid = emptyGrid;
    }

    getSize() {
      return this._size;
    }

    getCellValue(row, col) {
      return this._grid[row][col];
    }

    isCellOpen(row, col) {
      return this.getCellValue(row, col) === this._openMoveCellChar;
    }

    addMove(cell) {
      // if (!this.grid[row][col]) {
      // }
    }
  }

  // resets game
  const resetGame = () => {
    currentGame = new Game();
    renderGrid();
  };

  // VIEWS
  // -------------------------------------------------------
  // renders game grid
  const renderGrid = () => {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    const size = currentGame.getSize();
    for (let i = 0; i < size; i += 1) {
      const row = document.createElement('tr');
      row.setAttribute('id', `r${i}`);

      for (let j = 0; j < size; j += 1) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `r${i}c${j}`);
        cell.setAttribute('class', 'cell');
        cell.innerHTML = currentGame.getCellValue(i, j);
        row.appendChild(cell);
      }

      grid.appendChild(row);
    }
  };

  // CONTROLLERS
  // -------------------------------------------------------
  // click handler for moves
  const handleMoveClick = (e) => {
    const clickedCell = e.target;
    const row = clickedCell.getAttribute('id')[1];
    const col = clickedCell.getAttribute('id')[3];
    if (currentGame.isCellOpen(row, col)) {
      currentGame.addMove(row, col);
    }
  };

  // click handler for new game button
  const handleNewGameButtonClick = () => {
    resetGame();
  };

  const initializeControllers = () => {
    const grid = document.getElementById('grid');
    grid.addEventListener('click', handleMoveClick);

    const newGameButton = document.getElementById('new-game-btn');
    newGameButton.addEventListener('click', handleNewGameButtonClick);
  };

  // APP
  // -------------------------------------------------------
  // initializes app
  (function initializeApp() {
    resetGame();
    initializeControllers();
  }());
})();
