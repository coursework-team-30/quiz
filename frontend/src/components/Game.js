import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Game.css'
import data from '../demoData'
import Result from './Result'

const Game = () => {

  const randomElement = Math.floor(Math.random()*5)
  const currentQuestion = data.questions[randomElement]
  const [questionName,setQuestion] = useState(currentQuestion.question);
  const [answer,setAnswer] = useState();
  const [countQuestion,setCount] = useState(1);
  const [timer,setTimer] = useState(30);
  const [options,setOptions] = useState([currentQuestion.option1,currentQuestion.option2,currentQuestion.option3,currentQuestion.option4])
  const [correctAnswer,setCorrectAnswer] = useState(data.questions[randomElement].answer);
  const [score,setScore] = useState(0);
  const [classCorrectAnswer, setClassCorrectAnswer] = useState("");
  const [isQuizFinished,setIsQuizFinished] = useState(false);


  useEffect(() => {
    if(timer > 0){
      setTimeout(()=> setTimer(timer - 1),1000);
    }

    if(timer===0)
      setIsQuizFinished(() => true)
  })


  const selectAnswer = (e) => {
    setAnswer(() => e.target.value)
    if(e.target.innerText === correctAnswer)
    {
      // e.target.style.backgroundColor = "green";
      setClassCorrectAnswer(() => "greenBG");
      console.log(classCorrectAnswer)
      setScore((prev) => prev + 1);
    }
  }


  const nextQuestion = () => {
    if(answer){
    setQuestion(() => currentQuestion.question)
    setOptions(() => [currentQuestion.option1,currentQuestion.option2,currentQuestion.option3,currentQuestion.option4])
    setCorrectAnswer(() => data.questions[randomElement].answer)
    setCount((prev) => prev + 1)
    setAnswer(() => "")
    setClassCorrectAnswer(() => "")
   }
  }


  const submitAnswers = (e) => {
    if(countQuestion>4){
      setIsQuizFinished(()=> true) 
      console.log(score);
    }else{
      //let correctOption = document.querySelector('button').value(answer);
      //correctOption.style.backgroundColor = "green"
      nextQuestion()
    }
  }


  return (
   
    <div className='game'>
        <Header/>
        {!isQuizFinished? 
        (<div className='container'>
          <h2 className='question'>Question {countQuestion}/5</h2>
        <h3>Time Left: {timer}</h3>
        
        <p className='sub-question'>{questionName}</p>
        <div>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'a'?"hoverOption": "grey"}`}  value={"a"}>{options[0]}</button>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'b'?"hoverOption": "grey"}`} value={"b"}>{options[1]}</button>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'c'?"hoverOption": "grey"}`} value={"c"}>{options[2]}</button>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'd'?"hoverOption": "grey"}`} value={"d"}>{options[3]}</button>
      </div>
        
        <button onClick={(e) => submitAnswers(e)} className='next-button'>{countQuestion>=5? "Submit" : "Next Question"}</button> 
        </div> ) : (<Result score={score} timer={timer}/>) }
    </div>  
  )
}

export default Game