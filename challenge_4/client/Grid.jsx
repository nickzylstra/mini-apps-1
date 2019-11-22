import React from 'react';
import Row from './Row.jsx';

const Grid = ({ grid }) => (
  grid.map((row, key) => (
    <tr>
      <Row row={row} />
    </tr>
  ))
);

export default Grid;
