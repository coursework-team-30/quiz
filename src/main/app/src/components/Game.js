import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Game.css'
import Result from './Result'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'

const Game = () => {

  const {state} = useLocation();
  const {user,question} = state;


  const [countQuestion,setCount] = useState(1);
  const [questionName,setQuestion] = useState(question[0].question);
  const [answer,setAnswer] = useState();
  const [timer,setTimer] = useState(120);
  const [options,setOptions] = useState([question[0].options[0],question[0].options[1],question[0].options[2],question[0].options[3]])
  const [correctAnswer,setCorrectAnswer] = useState(question[0].correctAnswer);
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
    navigate(path, { state: { score:score, timer:timer, isSubmited:isSubmited,user:user,question:question } });
  }



  const handleSubmit = async () => {

        const id = user.split('@')[0];

        const bodyJSON = {
            userName: id,
            email : user,
            score: score
        }

        await axios.post('http://localhost:8091/api/quiz/add', bodyJSON).then((res) => {
            console.log("Scoreboard updated",res);
        }).catch((err) => {
            console.log(err);
        })
  }




  const nextQuestion = () => {
    if(answer){
    setCount((prev) => prev + 1);
    setQuestion(() => question[countQuestion].question)
    setOptions(() => [question[countQuestion].options[0],question[countQuestion].options[1],question[countQuestion].options[2],question[countQuestion].options[3]])
    setCorrectAnswer(() => question[countQuestion].correctAnswer)
    setAnswer(() => "")
    setClassCorrectAnswer(() => "")
   }
  }


  const submitAnswers = (e) => {
    if(countQuestion>9){
      setIsSubmited(true);
      handleSubmit();
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
            <h2 className='question'>Question {countQuestion}/10</h2>
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
        
        <button onClick={(e) => submitAnswers(e)} className='next-button'>{countQuestion>=10? "Submit" : "Next Question"}</button>
        </div> 
    </div>  
  )
}

export default Game