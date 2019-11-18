/* eslint-disable no-underscore-dangle */
// DS for game
let currentGame;
class Game {
  constructor() {
    this._turn = 1;
    this._size = 3;

    const emptyGrid = [];
    for (let i = 0; i < this._size; i += 1) {
      emptyGrid.push([]);
      for (let j = 0; j < this._size; j += 1) {
        emptyGrid[i].push('_');
      }
    }
    this._grid = emptyGrid;
  }

  getSize() {
    return this._size;
  }

  getBoxValue(row, col) {
    return this._grid[row][col];
  }

  // addMove(cell) {
  //   if (!this.grid[row][col]) {

  //   }
  // }
}

// renders game grid
const renderGrid = () => {
  const size = currentGame.getSize();
  const grid = document.getElementById('grid');
  for (let i = 0; i < size; i += 1) {
    const row = document.createElement('tr');
    row.setAttribute('id', `r${i}`);

    for (let j = 0; j < size; j += 1) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `r${i}c${j}`);
      cell.setAttribute('class', 'cell');
      cell.innerHTML = currentGame.getBoxValue(i, j);
      row.appendChild(cell);
    }

    grid.appendChild(row);
  }

  // click handler for boxes
  const gridClickHandler = (e) => {

  };

  grid.addEventListener('click', gridClickHandler);
};

// starts new game
const resetGame = () => {
  currentGame = new Game();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  renderGrid();
};

// initializes app
resetGame();
