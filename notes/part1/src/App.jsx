import { useState } from "react";

/* const App1 = () => {
  const [value, setValue] = useState(10);

  const hello = () => {
    const handler = () => console.log("hello world");
    return handler;
  };

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
      // <button onClick={() => console.log("hello world")}>button</button>
    </div>
  );
}; */

const App2 = () => {
  const [value, setValue] = useState(10);

  /* const hello = (who) => {
    const handler = () => {
      console.log("hello", who);
    };
    return handler;
  }; */

  const hello = (who) => () => {
    console.log("hello", who);
  };

  /* Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users. */

  return (
    <div>
      {value}

      <button onClick={hello("world")}>button</button>
      <button onClick={hello("react")}>button</button>
      <button onClick={hello("function")}>button</button>
    </div>
  );
};

/* const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  );
}; */

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
};

/* Choosing between the two presented ways of defining your event handlers is mostly a matter of taste. */

export default App;
