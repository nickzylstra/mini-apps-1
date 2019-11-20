/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/react-in-jsx-scope */

// eslint-disable-next-line no-undef
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      curComp: 0,
      components: [
        Home,
        F1,
      ],
    };
    this.showNextComp = this.showNextComp.bind(this);
  }

  showNextComp() {
    let { curComp } = this.state;
    this.setState({
      curComp: curComp += 1,
    });
  }

  render() {
    const { curComp, components } = this.state;
    const Comp = components[curComp];
    return (
      <Comp showNextComp={this.showNextComp} />
    );
  }
}

const Home = ({ showNextComp }) => (
  <div>
    <button type="button" onClick={showNextComp}>Checkout</button>
  </div>
);

const F1 = ({ showNextComp }) => (
  <div>
    hi
  </div>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, app);
