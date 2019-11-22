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
    const rowAffected = this.addMove(col);
    if (rowAffected) {
      this.incrementTurn();
    }
  }

  incrementTurn() {
    const { players, turn } = this.state;
    const curPlayer = turn % 2 === 0 ? players[1] : players[0];
    this.setState({
      curPlayer,
      turn: turn + 1,
    });
  }

  addMove(col) {
    const {
      grid, height, openVal, curPlayer,
    } = this.state;
    let rowAffected = null;

    let row = height - 1;
    while (row >= 0) {
      const rowCells = grid[row];
      if (rowCells[col] === openVal) {
        rowCells[col] = curPlayer;
        rowAffected = row;
        this.setState({ grid });
        break;
      }
      row -= 1;
    }

    return rowAffected;
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
