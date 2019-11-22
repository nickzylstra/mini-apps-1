import React from 'react';

const Row = ({ row }) => (
  row.map((cell, key) => (
    <td className="cell">{cell}</td>
  ))
);

export default Row;
