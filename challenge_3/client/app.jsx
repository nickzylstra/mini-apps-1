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
        F2,
        F3,
        Confirmation,
      ],
    };
    this.showNextComp = this.showNextComp.bind(this);
  }

  showNextComp() {
    // eslint-disable-next-line prefer-const
    let { curComp, components } = this.state;
    curComp = curComp + 1 === components.length ? 0 : curComp += 1;
    this.setState({
      curComp,
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
    F1
    <button type="button" onClick={showNextComp}>Next</button>
  </div>
);

const F2 = ({ showNextComp }) => (
  <div>
    F2
    <button type="button" onClick={showNextComp}>Next</button>
  </div>
);

const F3 = ({ showNextComp }) => (
  <div>
    F3
    <button type="button" onClick={showNextComp}>Next</button>
  </div>
);

const Confirmation = ({ showNextComp }) => (
  <div>
    Confirmation
    <button type="button" onClick={showNextComp}>Purchase</button>
  </div>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, app);
