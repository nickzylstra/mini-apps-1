class Game {
  constructor() {
    this.turn = 0;
    const emptyGrid = [];
    for (let i = 0; i < 3; i += 1) {
      emptyGrid.push([]);
      for (let j = 0; j < 3; j += 1) {
        emptyGrid[i].push(false);
      }
    }

    this.grid = emptyGrid;
  }

  addMove() {

  }
}

// creates empty game grid
const createGrid = () => {
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
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  createGrid();
};
resetGame();
