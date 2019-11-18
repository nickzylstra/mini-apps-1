// DS for game
let currentGame;
class Game {
  constructor() {
    this.turn = 1;
    const emptyGrid = [];
    for (let i = 0; i < 3; i += 1) {
      emptyGrid.push([]);
      for (let j = 0; j < 3; j += 1) {
        emptyGrid[i].push(false);
      }
    }

    this.grid = emptyGrid;
  }

  // addMove(cell) {
  //   if (!this.grid[row][col]) {

  //   }
  // }
}

// renders game grid
const renderGrid = () => {
  const grid = document.getElementById('grid');
  for (let i = 0; i < 3; i += 1) {
    const row = document.createElement('tr');
    row.setAttribute('id', `r${i}`);

    for (let j = 0; j < 3; j += 1) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `r${i}c${j}`);
      cell.setAttribute('class', 'cell');
      cell.innerHTML = '_';
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
