import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral, total, avg }) => {
  if (total === 0)
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feeback given</p>
      </div>
    );
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />

          <Statistic text='neutral' value={neutral} />

          <Statistic text='bad' value={bad} />

          <Statistic text='all' value={total} />

          <Statistic text='average' value={avg / total} />

          <Statistic text='positive' value={(good / total) * 100 + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [avg, setAvg] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClick = () => {
    setGood(good + 1);
    setAvg(avg + 1);
  };
  const neutralClick = () => setNeutral(neutral + 1);

  const badClick = () => {
    setBad(bad + 1);
    setAvg(avg - 1);
  };
  const total = good + bad + neutral;
  // TESTING FOR BUTTON FUNCTIONALITY
  // console.log("good =", good);
  // console.log("neutral =", neutral);
  // console.log("bad =", bad);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={goodClick} text='good' />
        <Button handleClick={neutralClick} text='neutral' />
        <Button handleClick={badClick} text='bad' />
      </div>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
      />
    </div>
  );
};

export default App;
