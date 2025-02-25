import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>
          {text === "positive" || text === "average"
            ? (value = value.toFixed(1))
            : (value = value)}
          {text === "positive" ? "%" : ""}
        </td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return (
      <>
        <h1>statictics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  let sum = good + neutral + bad;

  return (
    <>
      <h1>statictics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={sum}></StatisticLine>
          <StatisticLine text="average" value={sum / 3}></StatisticLine>
          <StatisticLine
            text="positive"
            value={(good * 100) / sum}
          ></StatisticLine>
        </tbody>
      </table>
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
