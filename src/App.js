import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);

  const [likes, setLikes] = useState([0, 0, 0, 0, 0, 0]);

  // clicking Next Anecdote produces a new anecdote randomly from the array

  const handleClick = () => setSelected(Math.floor(Math.random() * 6));

  const handleLikes = () => {
    //add 1 to likes[selected]
    const update = [...likes];
    update[selected] = update[selected] + 1;
    setLikes(update);
  };

  const mostLikes = (arr) => {
    let i;
    let max = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return arr.indexOf(max);
  };

  //TESTING FOR VARIABLES
  console.log("selected =", selected);
  console.log("likes =", likes);
  console.log("Anecdote w/ the most likes is at index", mostLikes(likes));
  return (
    <div>
      {/* display random anecdote */}
      {anecdotes[selected]}
      <br></br>
      {/* display likes */}
      <p>has {likes[selected]} likes </p>
      <br></br>
      {/* button for new anecdote */}
      <button onClick={handleClick}>Next Anecdote</button>
      {/* like button */}
      <button onClick={handleLikes}>Like</button>
      <h1>Top Rated:</h1>
      {anecdotes[mostLikes(likes)]}
      <br></br>
      has {likes[mostLikes(likes)]} likes
    </div>
  );
};

export default App;
