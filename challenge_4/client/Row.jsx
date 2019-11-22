/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react';

const Row = ({ row, rowNum, handleClick }) => (
  row.map((cell, col) => (
    <td
      key={col}
      className="cell"
      onClick={() => handleClick(rowNum, col)}
    >
      {cell}
    </td>
  ))
);

export default Row;
