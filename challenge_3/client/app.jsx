/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/react-in-jsx-scope */

// eslint-disable-next-line no-undef
class App extends React.Component {
  constructor() {
    super();
    this.curComp = 'Home';
    this.components = {
      Home,
    };
  }

  render() {
    const Comp = this.components[this.curComp];
    return (
      <Comp />
    );
  }
}

// eslint-disable-next-line no-undef
class Home extends React.Component {
  handleCheckout() {

  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleCheckout()}>Checkout</button>
      </div>
    );
  }
}


// eslint-disable-next-line no-undef
ReactDOM.render(<App />, app);
