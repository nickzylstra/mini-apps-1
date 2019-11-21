import React from 'react';

class Board extends React.Component {
  constructor() {
    super();
    const width = 7;
    const height = 6;
    const grid = [];
    for (let i = 0; i < height; i += 1) {
      grid.push([]);
      for (let j = 0; j < width; j += 1) {
        grid[i].push(false);
      }
    }
    this.state = {
      grid,
    };
  }

  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}

export default Board;
