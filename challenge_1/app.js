/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
(() => {
  // MODEL
  // -------------------------------------------------------
  // DS for game
  let modelCurrentGame;
  class ModelGame {
    constructor() {
      this._size = 3;
      this._openMoveCellChar = '_';
      this._turn = 1;
      this._status = 'game in progress!';

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

    isGameOver() {
      return this._status !== 'game in progress!';
    }

    addMove(row, col) {
      if (this.isCellOpen(row, col) && !this.isGameOver()) {
        this._grid[row][col] = this._turn % 2 === 0 ? 'O' : 'X';
        this._turn += 1;
        renderGrid(modelCurrentGame);
        renderGameStatus(this.getStatus());
      }
    }

    hasRowWin() {
      for (let i = 0; i < this._size; i += 1) {
        const firstColMark = this._grid[i][0];
        if (firstColMark !== this._openMoveCellChar) {
          for (let j = 1; j < this._size; j += 1) {
            const curColMark = this._grid[i][j];
            if (curColMark !== firstColMark) {
              break;
            }
            if (j === this._size - 1) {
              // found win
              return firstColMark;
            }
          }
        }
      }
      // no win
      return false;
    }

    hasColWin() {
      for (let i = 0; i < this._size; i += 1) {
        const firstRowMark = this._grid[i][0];
        if (firstRowMark !== this._openMoveCellChar) {
          for (let j = 1; j < this._size; j += 1) {
            const curRowMark = this._grid[i][j];
            if (curRowMark !== firstRowMark) {
              break;
            }
            if (j === this._size - 1) {
              // found win
              return firstRowMark;
            }
          }
        }
      }
      // no win
      return false;
    }

    hasDiagWin() {

      return false;
    }

    hasWin() {
      return this.hasRowWin() || this.hasColWin() || this.hasDiagWin();
    }

    getStatus() {
      // check if a player has won or stalemate
      let newStatus = this.hasWin();
      // update status if change
      if (newStatus) {
        this._status = `${newStatus} wins!`;
      } else if (this._turn === 10) {
        this._status = 'stalemate!';
      }

      return this._status;
    }
  }

  // resets game
  const modelResetGame = () => {
    modelCurrentGame = new ModelGame();
    renderGrid(modelCurrentGame);
    renderGameStatus(modelCurrentGame.getStatus());
  };

  // VIEWS
  // -------------------------------------------------------
  // renders game grid
  const renderGrid = (game) => {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    const size = game.getSize();
    for (let i = 0; i < size; i += 1) {
      const row = document.createElement('tr');
      row.setAttribute('id', `r${i}`);

      for (let j = 0; j < size; j += 1) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `r${i}c${j}`);
        cell.setAttribute('class', 'cell');
        cell.innerHTML = game.getCellValue(i, j);
        row.appendChild(cell);
      }

      grid.appendChild(row);
    }
  };

  const renderGameStatus = (status) => {
    const statusEl = document.getElementById('game-status');
    statusEl.innerHTML = status;
  };

  // CONTROLLERS
  // -------------------------------------------------------
  // click handler for moves
  const handleMoveClick = (e) => {
    const clickedCell = e.target;
    const row = clickedCell.getAttribute('id')[1];
    const col = clickedCell.getAttribute('id')[3];
    modelCurrentGame.addMove(row, col);
  };

  // click handler for new game button
  const handleNewGameButtonClick = () => {
    modelResetGame();
  };

  // initializes app controllers
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
    modelResetGame();
    initializeControllers();
  }());
})();
