import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Game.css'
import data from '../demoData'

const Game = () => {

  const randomElement = Math.floor(Math.random()*5)
  const currentQuestion = data.questions[randomElement]
  const [questionName,setQuestion] = useState(currentQuestion.question);
  const [answer,setAnswer] = useState();
  const [countQuestion,setCount] = useState(1);
  const [timer,setTimer] = useState(60);
  const [options,setOptions] = useState([currentQuestion.option1,currentQuestion.option2,currentQuestion.option3,currentQuestion.option4])
  const [correctAnswer,setCorrectAnswer] = useState(data.questions[randomElement].answer);
  const [score,setScore] = useState(0);


  useEffect(() => {
    if(timer > 0){
      setTimeout(()=> setTimer(timer - 1),1000);
    }
  })


  const selectAnswer = (e) => {
    setAnswer(() => e.target.value)
    if(e.target.innerText === correctAnswer)
    {
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
    
   }
  }


  const submitAnswers = (e) => {
    if(countQuestion>4){
      e.target.innerText = "Submit"
      console.log(score);
    }else{
      nextQuestion()
    }
  }





  return (
    <div className='game'>
        <Header/>
        <h2 className='question'>Question {countQuestion}/5</h2>
        <h3>Time Left: {timer}</h3>
        
        <p className='sub-question'>{questionName}</p>
        <div>
            <button style={{backgroundColor: `${answer}`=== 'a'? 'rgb(4, 113, 135)':'grey' }} onClick={(e) => selectAnswer(e)} className='but' value={"a"}>{options[0]}</button>
            <button style={{backgroundColor: `${answer}`=== 'b'? 'rgb(4, 113, 135)':'grey' }} onClick={(e) => selectAnswer(e)} className='but' value={"b"}>{options[1]}</button>
            <button style={{backgroundColor: `${answer}`=== 'c'? 'rgb(4, 113, 135)':'grey' }} onClick={(e) => selectAnswer(e)} className='but' value={"c"}>{options[2]}</button>
            <button style={{backgroundColor: `${answer}`=== 'd'? 'rgb(4, 113, 135)':'grey' }} onClick={(e) => selectAnswer(e)} className='but' value={"d"}>{options[3]}</button>
      </div>
        <button onClick={submitAnswers} className='next-button'>Next Question</button>
    </div>
  )
}

export default Game