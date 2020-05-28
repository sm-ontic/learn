import * as React from "react";
import Actions from "./actions";

const Body = props => {
  return (
    <p className="App-intro">
      <div className="button-container">
        <div className="counter-text">{props.counter}</div>
        <Actions counter={props.counter} onChange={props.onChange} />
      </div>
    </p>
  );
};

export default Body;
