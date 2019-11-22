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
      status: 'in progress',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(col) {
    const { status, turn } = this.state;
    if (status !== 'in progress') {
      return;
    }

    const rowAffected = this.addMove(col);
    if (!rowAffected) {
      return;
    }

    if (this.hasAnyWin(rowAffected, col)) {
      return;
    }

    this.incrementTurn();
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

  hasAnyWin(row, col) {
    const { curPlayer } = this.state;
    const hasWin = this.hasRowWin(row) || this.hasColWin(col) || this.hasDiagWin(row, col);
    // TODO move to increment turn
    if (hasWin) {
      this.setState({
        status: `${curPlayer} wins!`,
      });
    }
    return hasWin;
  }

  hasRowWin(row) {
    const { grid, width, openVal } = this.state;
    let sameCount = 1;
    const curPlayer = grid[row][0];
    for (let i = 1; i < width; i += 1) {
      const curCell = grid[row][i];
      if (curCell === curPlayer && curCell !== openVal) {
        sameCount += 1;
      } else {
        sameCount = 1;
      }

      if (sameCount === 4) {
        return true;
      }
    }
    return false;
  }

  hasColWin(col) {
    const { grid, height, openVal } = this.state;
    let sameCount = 1;
    const curPlayer = grid[0][col];
    for (let i = 1; i < height; i += 1) {
      const curCell = grid[i][col];
      if (curCell === curPlayer && curCell !== openVal) {
        sameCount += 1;
      } else {
        sameCount = 1;
      }

      if (sameCount === 4) {
        return true;
      }
    }
    return false;
  }

  hasDiagWin(row, col) {

  }

  incrementTurn() {
    const {
      players, turn, width, height, status,
    } = this.state;
    const curPlayer = turn % 2 === 0 ? players[1] : players[0];
    const nextTurn = turn + 1;
    let newStatus = status;

    if (nextTurn === width * height) {
      newStatus = 'stalemate!';
    }

    this.setState({
      curPlayer,
      turn: nextTurn,
      status: newStatus,
    });
  }

  render() {
    const { grid, width, status } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={width}>
                Connect 4!  ...
                {status}
              </th>
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
