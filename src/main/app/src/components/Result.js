import React from 'react'
import './Result.css'
import {useNavigate,useLocation} from 'react-router-dom'
import Header from './Header'

const Result = () => {


  const {state} = useLocation();

  const {score,timer,isSubmited} = state;

    const routeToGame = ()=>{
      let path = `/game`;
      navigate(path);
     }

     let navigate = useNavigate(); 

     const routeToHome =() => {
        let path = `/`;
        navigate(path);
     }

     const routeToLeaderBoard = () => {
      let path = `/leaderboard`; 
      navigate(path);
     }
     


  return (
    <div style={{display:"flex",flexDirection:"column", alignItems:"center",backgroundColor:"#224A94",height:"100vh"}}>
        <Header />
        <h1 className='timeOver'>{(!timer && !isSubmited) ? "TIME OVER":""}</h1>
        <img className='badgeImg' src={require('./img/Media.png')} />
        <h1 className='score'>SCORE:<span style={{marginLeft:"10px"}}>{score}</span></h1>
        <div className='content-div'>
        <h1>{score===10 ? "Perfect Score! Well Done." : (score >=7 && score < 10) ? "Good try! Try Again." : "That's a bad score, try again!"}</h1>
        </div>  

        <div className='endRowDiv'>
        <img onClick={routeToHome} className='homeImg' src={require('./img/Home.png')} />
        <button onClick={routeToGame} className='next-button'>PLAY AGAIN</button> 
        <img onClick={routeToLeaderBoard} className='leaderBoardImg' src={require('./img/leaderBoard.png')} />
        </div> 
        
    </div>
  )
}

export default Result