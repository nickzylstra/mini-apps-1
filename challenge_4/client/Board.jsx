import React from 'react';
import Grid from './Grid.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const width = 7;
    const height = 6;
    const grid = [];
    const openVal = 'open';
    const players = ['Red', 'Black'];
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
      turn: 0,
      curPlayer: players[0],
      players,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(col) {
    const didAddMove = this.addMove(col);
    if (didAddMove) {
      // TODO - update status
      const { grid } = this.state;
      const newState = { grid };
      this.setState(newState);
    }
  }

  addMove(col) {
    const {
      grid, height, openVal, curPlayer,
    } = this.state;
    let didAddMove = false;

    let row = height - 1;
    while (row >= 0) {
      const rowCells = grid[row];
      if (rowCells[col] === openVal) {
        rowCells[col] = curPlayer;
        didAddMove = true;
        this.setState({ grid });
        break;
      }
      row -= 1;
    }

    return didAddMove;
  }

  render() {
    const { grid, width } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={width}>Connect 4!</th>
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
