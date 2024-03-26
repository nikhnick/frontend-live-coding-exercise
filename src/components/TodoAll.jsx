import React, { useState } from "react";

function TodoAll() {
  const questions = [
    "Can you code in Ruby?",
    "Can you code in JavaScript?",
    "Can you code in Swift?",
    "Can you code in Java?",
    "Can you code in C#?",
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [optionSelection, setOptionSelection] = useState([]);
  const [average, setAverage] = useState(localStorage.getItem("Score"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    let score = localStorage.getItem("Score");
    let c = localStorage.getItem("Counter");

    c = c == null ? 1 : parseInt(c) + 1;

    localStorage.setItem("Counter", c);

    let currentScore =
      (100 * optionSelection.filter((a) => a == true).length) /
      questions.length;

    if (average == null) {
      localStorage.setItem("Score", currentScore);
      setAverage(currentScore);
    } else {
      score = Math.round(
        Number((100 * (currentScore + Number(average))) / (c * 100))
      );
      setAverage(score);
      localStorage.setItem("Score", currentScore + Number(average));
    }
  };

  const handleRadio = (e, flag, indx) => {
    setIsSubmitted(false);
    const getOptions = [...optionSelection];
    getOptions[indx] = flag;
    setOptionSelection([...getOptions]);
  };

  return (
    <>
      <div>
        {questions.map((q, i) => (
          <div style={{ textAlign: "left" }} key={i + "c"}>
            <h4 key={i + "q"}>{q}</h4>
            <input
              type="radio"
              name={i + "answerGroup"}
              onChange={(e) => handleRadio(e, true, i)}
              value="true"
            />{" "}
            Yes
            <input
              type="radio"
              name={i + "answerGroup"}
              onChange={(e) => handleRadio(e, false, i)}
              value="false"
            />{" "}
            No
          </div>
        ))}

        <div style={{ padding: "10px" }}>
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "gray", color: "#fff" }}
          >
            SUBMIT
          </button>
        </div>
      </div>
      {isSubmitted && (
        <div>
          <h3>
            {`The total score is: ${
              (100 * optionSelection.filter((a) => a == true).length) /
              questions.length
            } %`}
          </h3>
        </div>
      )}
      <h3>{`The overall average is: ${average == null ? 0 : average} %`}</h3>
    </>
  );
}

export default TodoAll;
