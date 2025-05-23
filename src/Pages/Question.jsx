import React, { useState } from 'react'
import "./Questions.css"
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorMessage from '../Components/ErrorMessage.jsx';


function Question(
    {
          currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
    }
) {
 
    console.log(questions[currQues].question)
    const [Selected, setSelected] = useState();
    const [Error, setError] = useState(false)

    const navigate = useNavigate();

    const handleSelect = (i)=>{
          if (Selected === i && Selected === correct) return "select";
    else if (Selected === i && Selected !== correct) return "wrong";
    else if (i === correct) return "select";
    }

    const handleCheck = (i)=>{
         setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
    }

      const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

    const handleNext = () => {
    if (currQues > 8) {
     navigate("/Result");
    } else if (Selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };


  return (
    <div className="mainDiv">
        <h1>Question {currQues + 1}</h1>
        <div className='singleQuestion'>

       <h2>{questions[currQues].question}</h2>

       <div className='options'>
         {Error && <ErrorMessage>{Error}</ErrorMessage>}
            {
                options&&
                options.map(i=>
                (
                    <button
                className={`singleOption  ${Selected && handleSelect(i)}`}
                key={i}
                 onClick={() => handleCheck(i)}
                disabled={Selected}
              >
                {i}
              </button>
                )
                )
            }
       </div>
       <div className='controls'>

         <Button 
         className='quesBtn'
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
          className='quesBtn'
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
       </div>
        </div>
    </div>
  )
}

export default Question