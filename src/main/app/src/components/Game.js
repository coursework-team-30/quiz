import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Game.css'
import data from '../demoData'
import Result from './Result'

import axios from 'axios'
import {useNavigate} from 'react-router-dom'

// import timer from '../../public/img/timer.png'


const Game = () => {

  const randomElement = Math.floor(Math.random()*5)
  const currentQuestion = data.questions[randomElement]
  const [questionName,setQuestion] = useState(currentQuestion.question);
  const [answer,setAnswer] = useState();
  const [countQuestion,setCount] = useState(1);
  const [timer,setTimer] = useState(120);
  const [options,setOptions] = useState([currentQuestion.option1,currentQuestion.option2,currentQuestion.option3,currentQuestion.option4])
  const [correctAnswer,setCorrectAnswer] = useState(data.questions[randomElement].answer);
  const [score,setScore] = useState(0);
  const [classCorrectAnswer, setClassCorrectAnswer] = useState("");
  const [isSubmited,setIsSubmited] = useState(false);



  useEffect(() => {
    if(timer > 0){
      setTimeout(()=> setTimer(timer - 1),1000);
    }

    if(timer===0)
      {
        routeChangeToResult();
      }
  },[timer])


  const selectAnswer = (e) => {
    setAnswer(() => e.target.value)
    if(e.target.innerText === correctAnswer)
    {
      setClassCorrectAnswer(() => "greenBG");
      console.log(classCorrectAnswer)
      setScore((prev) => prev + 1);
    }
  }


  
  let navigate = useNavigate(); 
  const routeChangeToResult = () =>{ 
    let path = `/result`; 
    navigate(path, { state: { score:score, timer:timer, isSubmited:isSubmited } });
  }


  //  const getQuestions = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8091/api/quiz/get10');
  //     console.log(response);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  // getQuestions();


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
      setIsSubmited(true);
      routeChangeToResult();
      console.log(score);
    }else{
      nextQuestion()
    }
  }


 return (
   
    <div className='game'>
        <Header/>
        <div className='container'> 
          <div className='question-row'>
            <h1 style={{visibility:"hidden"}}>Blank</h1>
            <h2 className='question'>Question {countQuestion}/5</h2>
            <div className='timer-div'>
              <img className='timerImg' src={require('./img/timer.png')} />
              <h3 className='timer'> {timer} seconds</h3>
            </div>
          </div>
         
        
        
        <p className='sub-question'>{questionName}</p>
        <div className='options'>
          <div className='option'>
            <p>A</p>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'a'?"hoverOption": "grey"}`}  value={"a"}>{options[0]}</button>
          </div>
          <div className='option'>
            <p>B</p>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'b'?"hoverOption": "grey"}`} value={"b"}>{options[1]}</button>
          </div>
          <div className='option'>
            <p>C</p>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'c'?"hoverOption": "grey"}`} value={"c"}>{options[2]}</button>
          </div>
          <div className='option'>
            <p>D</p>
            <button  onClick={(e) => selectAnswer(e)} className={`but ${answer === 'd'?"hoverOption": "grey"}`} value={"d"}>{options[3]}</button>
          </div>
      </div>
        
        <button onClick={(e) => submitAnswers(e)} className='next-button'>{countQuestion>=5? "Submit" : "Next Question"}</button> 
        </div> 
    </div>  
  )
}

export default Game