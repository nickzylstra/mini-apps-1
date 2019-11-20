/* eslint-disable jsx-a11y/label-has-associated-control */
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
    this.postData = this.postData.bind(this);
  }

  showNextComp() {
    // eslint-disable-next-line prefer-const
    let { curComp, components } = this.state;
    curComp = curComp + 1 === components.length ? 0 : curComp += 1;
    this.setState({ curComp });
  }

  postData(formData) {
    console.log(`data posted for ${formData}`);
    this.showNextComp();
  }

  render() {
    const { curComp, components } = this.state;
    const Comp = components[curComp];
    return (
      <Comp
        showNextComp={this.showNextComp}
        postData={this.postData}
      />
    );
  }
}

const Home = ({ showNextComp }) => (
  <div>
    <button type="button" onClick={showNextComp}>Checkout</button>
  </div>
);

// eslint-disable-next-line no-undef
class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { postData } = this.props;
    postData(this.state);
  }

  render() {
    return (
      <div>
        F1
        <form onSubmit={this.handleSubmit}>
          <label>
            name:
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            email:
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            password:
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

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
