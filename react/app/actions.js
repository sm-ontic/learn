import * as React from "react";

const Actions = props => {
  const [counterLimit, setCounterLimit] = React.useState(10);

  React.useEffect(() => {
    if (props.counter > 0) setCounterLimit(counterLimit - props.counter);
    else if (props.counter < 0) setCounterLimit(counterLimit + props.counter);
  }, [props.counter]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button
        className="decrement-button"
        onClick={() => {
          props.onChange(props.counter - 1);
        }}
      >
        -
      </button>
      <button
        style={{ marginLeft: 10 }}
        className="increment-button"
        onClick={() => {
          props.onChange(props.counter + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Actions;
