import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "./Question";

function Quiz({ name, Score, questions, setQuestions, setScore }) {
  const [Options, setOptions] = useState();
  const [CurrQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[CurrQues]?.correct_answer,
          ...questions[CurrQues]?.incorrect_answers,
        ])
    );
  }, [CurrQues, questions]);

  console.log(Options);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="Subtitle">Welcome , {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[CurrQues].category}</span>
            <span>
              {/* {questions[currQues].difficulty} */}
              Score : {Score}
            </span>
          </div>

          <Question 
           currQues={CurrQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={Options}
            correct={questions[CurrQues]?.correct_answer}
            score={Score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
}

export default Quiz;
