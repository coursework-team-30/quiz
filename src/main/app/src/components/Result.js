import React from 'react'
import './Result.css'
import {useNavigate} from 'react-router-dom'

const Result = ({score,timer,isSubmited}) => {

    const refreshPage = ()=>{
        window.location.reload();
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
    <div style={{display:"flex",flexDirection:"column", alignItems:"center",backgroundColor:"#224A94"}}>
        <h1>{(!timer && !isSubmited) ? "TIME OVER":""}</h1>
        <img className='badgeImg' src={require('./img/Media.png')} />
        <h1 className='score'>SCORE:<span style={{marginLeft:"10px"}}>{score}</span></h1>
        <div className='content-div'>
        <h1>{score===5 ? "Perfect Score! Well Done." : (score >=3 && score < 5) ? "Good try! Try Again." : "That's a bad score, try again!"}</h1>
        </div>  

        <div className='endRowDiv'>
        <img onClick={routeToHome} className='homeImg' src={require('./img/Home.png')} />
        <button onClick={refreshPage} className='next-button'>PLAY AGAIN</button> 
        <img onClick={routeToLeaderBoard} className='leaderBoardImg' src={require('./img/leaderBoard.png')} />
        </div> 
        
    </div>
  )
}

export default Result