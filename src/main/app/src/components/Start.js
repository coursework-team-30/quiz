import React, { useEffect, useState } from 'react'
import './Start.css'
import axios from 'axios'
// import data from '../backendData'

import {useNavigate} from 'react-router-dom'

const Start = () => {

    const [userName,setUserName] = useState("");
    const [isError,setIsError] = useState(true);
    const [question, setQuestions] = useState([]);

    React.useEffect(() => {
      getQuestions();
      console.log(question)
    },[])

      async function getQuestions() {
            await axios.get('http://localhost:8091/api/quiz/get10').then((res) => {
              console.log(res.data)
              setQuestions(res.data)
            }).catch((err) => {
              console.log("NOT Found: ",err);
            })
       }

    let navigate = useNavigate(); 
    const routeChangeToLeaderBoard = () =>{ 
    let path = `leaderboard`; 
    navigate(path);
    }


    const pathToGame = () => {
      let path = `game`;
      navigate(path, {state: {question:question,user:userName}});
    } 


    const routeToGame = () => {
        if(userName)
        {
            if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userName))
            {
              pathToGame();
            }
            else
            {
                setIsError(() => false);
                console.log("Wrong Input")
            }      
        }
        else {
            setIsError(() => false);
        }
    }

    const setUserNameFunc = (e) => {
        setUserName(() => e.target.value);
    }


  return (
    <div className='container-start'>
        <div className='heading-div'>
              <h1 className='head1'>Quiz Masters</h1>
              <h2 className='head2'>let's test your knowledge</h2>
          </div><div className='input-div'>
                  <h4 className={isError ? "errorMsg" : "errorMsgVisible"}>* Please enter a valid mail Id to start</h4>
                  <input name='emailInput' className='nameInput' onChange={(e)=> setUserNameFunc(e)} placeholder='Enter your email Address..'/>
                  <button className='startButton' onClick={routeToGame}>Start</button>
              </div>
              <div className='endRow'>
                    <div style={{visibility:"hidden"}}>Blank</div>
                    <div style={{visibility:"hidden"}}>Blank</div>
                    <img onClick={routeChangeToLeaderBoard} className='leaderImg' src={require('./img/leaderBoard.png')} />
            </div>
    </div>
  )
}

export default Start