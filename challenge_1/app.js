/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
window.addEventListener('DOMContentLoaded', () => {
  // MODEL
  // -------------------------------------------------------
  // DS for game
  class Game {
    constructor() {
      this._size = 3;
      this._openMoveMark = '_';
      this._turn = 1;
      this._status = 'game in progress!';

      const emptyGrid = [];
      for (let i = 0; i < this._size; i += 1) {
        emptyGrid.push([]);
        for (let j = 0; j < this._size; j += 1) {
          emptyGrid[i].push(this._openMoveMark);
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
      return this.getCellValue(row, col) === this._openMoveMark;
    }

    isGameOver() {
      return this._status !== 'game in progress!';
    }

    addMove(row, col) {
      let moveAdded = false;
      if (this.isCellOpen(row, col) && !this.isGameOver()) {
        this._grid[row][col] = this._turn % 2 === 0 ? 'O' : 'X';
        this._turn += 1;
        moveAdded = true;
      }
      return moveAdded;
    }

    hasRowWin() {
      for (let i = 0; i < this._size; i += 1) {
        const firstColMark = this._grid[i][0];
        if (firstColMark !== this._openMoveMark) {
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
        const firstRowMark = this._grid[0][i];
        if (firstRowMark !== this._openMoveMark) {
          for (let j = 1; j < this._size; j += 1) {
            const curRowMark = this._grid[j][i];
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

    hasMajorDiagWin() {
      const size = this._size;
      let row = 0;
      let col = 0;
      const firstCellMark = this._grid[row][col];
      if (firstCellMark !== this._openMoveMark) {
        while (row < size) {
          const curCellMark = this._grid[row][col];
          if (curCellMark !== firstCellMark) {
            break;
          }
          row += 1;
          col += 1;
          if (row === size) {
            return firstCellMark;
          }
        }
      }
      return false;
    }

    hasMinorDiagWin() {
      const size = this._size;
      let row = 0;
      let col = size - 1;
      const firstCellMark = this._grid[row][col];
      if (firstCellMark !== this._openMoveMark) {
        while (row < size) {
          const curCellMark = this._grid[row][col];
          if (curCellMark !== firstCellMark) {
            break;
          }
          row += 1;
          col -= 1;
          if (row === size) {
            return firstCellMark;
          }
        }
      }
      return false;
    }

    hasWin() {
      // eslint-disable-next-line max-len
      return this.hasRowWin() || this.hasColWin() || this.hasMajorDiagWin() || this.hasMinorDiagWin();
    }

    getStatus() {
      // check if a player has won or stalemate
      const newStatus = this.hasWin();
      // update status if change
      if (newStatus) {
        this._status = `${newStatus} wins!`;
      } else if (this._turn === 10) {
        this._status = 'stalemate!';
      }

      return this._status;
    }
  }

  // VIEWS
  // -------------------------------------------------------
  const views = {
    // renders game grid
    renderGrid: (game) => {
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
    },

    // renders game status
    renderGameStatus: (status) => {
      const statusEl = document.getElementById('game-status');
      statusEl.innerHTML = status;
    },
  };

  // CONTROLLERS
  // -------------------------------------------------------
  const controllers = {
    // click handler for moves
    handleMoveClick: (e) => {
      const clickedCell = e.target;
      const row = clickedCell.getAttribute('id')[1];
      const col = clickedCell.getAttribute('id')[3];
      const moveAdded = modelCurrentGame.addMove(row, col);
      if (moveAdded) {
        views.renderGrid(modelCurrentGame);
        views.renderGameStatus(modelCurrentGame.getStatus());
      }
    },

    // click handler for new game button
    handleNewGameButtonClick: () => {
      modelCurrentGame = new Game();
      views.renderGrid(modelCurrentGame);
      views.renderGameStatus(modelCurrentGame.getStatus());
    },
  };

  // APP
  // -------------------------------------------------------
  // initializes app
  let modelCurrentGame = new Game();
  views.renderGrid(modelCurrentGame);
  views.renderGameStatus(modelCurrentGame.getStatus());

  // initializes app controllers
  (function initializeControllers() {
    const grid = document.getElementById('grid');
    grid.addEventListener('click', controllers.handleMoveClick);

    const newGameButton = document.getElementById('new-game-btn');
    newGameButton.addEventListener('click', controllers.handleNewGameButtonClick);
  }());
});
