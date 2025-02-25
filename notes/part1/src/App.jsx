import { useState } from "react";

/* const App = () => {
  const [value, setValue] = useState(10);

  // Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

  return (
    <div>
      {value}
      {// <button onClick={() => console.log("clicked the button")}>button</button>}

      <button onClick={() => setValue(0)}>button</button>{" "} // Defining event handlers directly in the attribute of the button is not necessarily the best possible idea.
      
    </div>
  );
}; */

const App = () => {
  const [value, setValue] = useState(10);

  const handleClick = () => {
    console.log("clicked the button");
    setValue(0);
  };

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  );
};

export default App;
