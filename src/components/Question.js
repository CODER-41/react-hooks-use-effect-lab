import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code to implement timer using useEffect
  useEffect(() => {
    //Exit condition: when time is up
    if (timeRemaining === 0) {
      // 1. Call onAnswered(false) because time ran out
      onAnswered(false);
      // 2. Reset timeRemaining for the next question
      setTimeRemaining(10);
      return; // Stop the effect for this cycle
    }

    //Set up the timeout to decrease timeRemaining after 1 second
    const timerId=setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    //Cleanup function: Clear the timeout when the component unmounts
    //or before the effect runs again (if dependencies change).
    return () => {
      clearTimeout(timerId)
    }
    //DEpendencies:
    //-timeRemaining: Returns the effect whenever the time changes (every second)
    // -onAnswered: Included to satisfy the linear, though its value is stable for this component's lifecycle.
  }, [timeRemaining, onAnswered]);


  function handleAnswer(isCorrect) {
    //When an answer is clicked, reset the timer and notify the parent
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
