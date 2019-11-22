import React from 'react';

class Board extends React.Component {
  constructor() {
    super();
    const width = 7;
    const height = 6;
    const grid = [];
    for (let i = 0; i < width; i += 1) {
      grid.push([]);
      for (let j = 0; j < height; j += 1) {
        grid[i].push(false);
      }
    }
    this.state = {
      grid,
      height,
      width,
    };
  }

  addMove(col, player) {
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

  render() {
    const { width, grid, height } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={width}>Make a move</th>
            </tr>
          </thead>
          <tbody>
            {
              // for (let i = 0; i < height; i += 1) {
              //   <tr>

              //   </tr>
              // }
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
