import React from 'react';
import Grid from './Grid.jsx';

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
        grid[i].push(openVal);
      }
    }
    this.state = {
      grid,
      openVal,
      height,
      width,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, col) {
    const { grid } = this.state;
    debugger;
    const newState = { grid };
    this.setState(newState);
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

  render() {
    const { grid } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Make a move</th>
            </tr>
          </thead>
          <tbody>
            <Grid grid={grid} handleClick={this.handleClick} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
