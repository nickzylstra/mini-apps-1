/* eslint-disable react/no-array-index-key */
import React from 'react';
import Row from './Row.jsx';

const Grid = ({ grid, handleClick }) => (
  grid.map((row, rowNum) => (
    <tr key={rowNum}>
      <Row row={row} handleClick={handleClick} />
    </tr>
  ))
);

export default Grid;
