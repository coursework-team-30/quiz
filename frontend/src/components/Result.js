import React from 'react'

const Result = ({score,timer}) => {

    const refreshPage = ()=>{
        window.location.reload();
     }


  return (
    <div style={{marginTop:"10em",display:"flex",flexDirection:"column", alignItems:"center"}}>
        <h1>{!timer ? "TIME OVER":""}</h1>
        <h1>{score===5 ? "Perfect Score! Well Done." : (score >=3 && score < 5) ? "Good try! Try Again." : "That's a bad score, try again!"}</h1>
        <h2>Your Score is <span style={{fontSize:"2rem", marginLeft:"10px"}}>{score}/5</span></h2>   
        <button onClick={refreshPage} className='next-button'>PLAY AGAIN</button> 
    </div>
  )
}

export default Result