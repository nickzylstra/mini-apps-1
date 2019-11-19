/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
window.addEventListener('DOMContentLoaded', () => {
  // MODEL
  // -------------------------------------------------------
  // DS for game
  let modelCurrentGame;
  let modelCurrentSession;
  class ModelGame {
    constructor(startingPlayer = 0) {
      this._size = 3;
      this._openMoveMark = '_';
      this._turn = 1;
      this._status = 'game in progress!';
      this._players = ['X', 'O'];
      this._startingPlayer = startingPlayer;
      this._winner = null;

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
        const mark = this._turn % 2 === 0
          ? this._players[Math.abs(this._startingPlayer - 1)]
          : this._players[this._startingPlayer];
        this._grid[row][col] = mark;
        this._turn += 1;
        moveAdded = true;
        this.updateStatus();
      }
      return moveAdded;
    }

    updateStatus() {
      // check if a player has won or stalemate
      const newStatus = this.hasWin();
      // update status if change
      if (newStatus) {
        this._status = `${newStatus} wins!`;
        this._winner = newStatus === this._players[0] ? 0 : 1;
      } else if (this._turn === this._size * this._size + 1) {
        this._status = 'stalemate!';
      }
    }

    getStatus() {
      return this._status;
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

    getWinner() {
      return this._winner;
    }
  }

  // DS for session
  class Session {
    constructor() {
      this.playerNames = ['Player 1', 'Player 2'];
      this.playerWins = [0, 0];
      this.lastWinner = 0;
    }

    addWin(playerNum) {
      this.lastWinner = playerNum;
      this.playerWins[playerNum] += 1;
    }

    changePlayerName(playerNum, playerName) {
      this.playerNames[playerNum] = playerName;
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

    renderSession: ({ playerNames, playerWins }) => {
      const sessionEl = document.getElementById('session');
      sessionEl.innerHTML = '';

      const player1 = document.createElement('div');
      const player1Name = document.createElement('span');
      player1Name.innerHTML = `X's: ${playerNames[0]}`;
      player1.appendChild(player1Name);
      const p1Wins = document.createElement('span');
      p1Wins.innerHTML = ` - Wins: ${playerWins[0]}`;
      player1.appendChild(p1Wins);
      sessionEl.appendChild(player1);

      const player2 = document.createElement('div');
      const player2Name = document.createElement('span');
      player2Name.innerHTML = `O's: ${playerNames[1]}`;
      player2.appendChild(player2Name);
      const p2Wins = document.createElement('span');
      p2Wins.innerHTML = ` - Wins: ${playerWins[1]}`;
      player2.appendChild(p2Wins);
      sessionEl.appendChild(player2);
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
        // could refactor to update just cell affected by move
        views.renderGrid(modelCurrentGame);
        views.renderGameStatus(modelCurrentGame.getStatus());

        const winner = modelCurrentGame.getWinner();
        if (winner !== null) {
          modelCurrentSession.addWin(winner);
          views.renderSession(modelCurrentSession);
        }
      }
    },

    // click handler for new game button
    handleNewGameButtonClick: () => {
      const winner = modelCurrentGame.getWinner();
      let nextStartingPlayer = 0;
      if (winner !== null) {
        nextStartingPlayer = winner ? 0 : 1;
      }
      modelCurrentGame = new ModelGame(nextStartingPlayer);
      views.renderGrid(modelCurrentGame);
      views.renderGameStatus(modelCurrentGame.getStatus());
    },

    // add click handler to change names
  };

  // APP
  // -------------------------------------------------------
  // initializes model
  modelCurrentSession = new Session();
  modelCurrentGame = new ModelGame();

  // initializes views
  views.renderGrid(modelCurrentGame);
  views.renderGameStatus(modelCurrentGame.getStatus());
  views.renderSession(modelCurrentSession);

  // initializes controllers
  const grid = document.getElementById('grid');
  grid.addEventListener('click', controllers.handleMoveClick);

  const newGameButton = document.getElementById('new-game-btn');
  newGameButton.addEventListener('click', controllers.handleNewGameButtonClick);
});
