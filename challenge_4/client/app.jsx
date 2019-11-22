/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
