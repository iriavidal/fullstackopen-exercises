import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return (
      <>
        <h1>statictics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>statictics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive {(good * 100) / (good + neutral + bad)}%</p>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  );
};

export default App;
