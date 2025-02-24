import { useState } from "react";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  /* It's also possible in JavaScript to add items to an array with the push method. */
  /* However, don't do this. The state of React components, like allClicks, must not be mutated directly. Even if mutating state appears to work in some cases, it can lead to problems that are very hard to debug. */

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(" ")}</p>
    </div>
  );
};

export default App;
