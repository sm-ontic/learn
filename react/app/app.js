import React, { Component } from "react";
import Header from "./header";
import Body from "./body";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div className="App" style={{ padding: 10 }}>
        <Header />
        <Body
          counter={this.state.counter}
          onChange={counter => {
            this.setState({ counter });
          }}
        />
      </div>
    );
  }
}

export default App;
