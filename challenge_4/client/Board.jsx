import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const width = 7;
    const height = 6;
    const grid = [];
    const openVal = 'open';
    for (let i = 0; i < height; i += 1) {
      grid.push([]);
      for (let j = 0; j < width; j += 1) {
        grid[i].push(false);
      }
    }
    this.state = {
      grid,
      openVal,
      height,
      width,
    };
  }

  addMove(col, player) {
    // UPDATE
    const { grid, height } = this.state;
    let moveAdded = false;
    const colMoves = grid[col];

    let row = 0;
    while (row < height) {
      if (!colMoves[row]) {
        colMoves[row] = player;
        moveAdded = true;
        break;
      }
      row += 1;
    }

    return moveAdded;
  }

  // eslint-disable-next-line class-methods-use-this
  renderRow(row) {
    return row.map((cell, idx) => (
      <td className="cell">{cell}</td>
    ));
  }

  renderGrid() {
    const { grid } = this.state;
    return grid.map((row, idx) => (
      <tr>
        {this.renderRow(row)}
      </tr>
    ));
  }

  render() {
    const { width, grid, height } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Make a move</th>
            </tr>
          </thead>
          <tbody>
            {this.renderGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
