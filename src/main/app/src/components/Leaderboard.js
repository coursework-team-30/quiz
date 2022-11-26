import React, { useState } from 'react'
import './Leaderboard.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Leaderboard = () => {

    const [score,setScore] = useState([])

    React.useEffect(() => {
      getScores();
    },[])

    async function getScores() {
      await axios.get('http://localhost:8091/api/quiz/leaderboard').then((res) => {
        console.log(res.data)
        setScore(res.data)
      }).catch((err) => {
        console.log("NOT Found: ",err);
      })
    }


    const table = []
    for(let i = 0 ; i < score.length ; i++)
      {
        if(i<=4)
        {
          table.push(<div className='table'><h1 className='number'>{i+1}</h1><div className='row'><p>{score[i].userName}</p><p>{score[i].highScore}</p></div></div>)
        }
      }
        


        let navigate = useNavigate(); 
        const routeChangeToHome = () =>{ 
        let path = `/`; 
        navigate(path);
      }


  return (
    <div className='lead-container'>
        <h1 className='lead-title'>Leader Board</h1>
        <img className='cupImg' src={require('./img/Media2.png')} />
        <div className='tableHead'>
            <h2 className='nameH2'>Name</h2>
            <h2 className='scoreH2'>Score</h2>
        </div>
        {table}
        <img onClick={routeChangeToHome} className='homeLeadImg' src={require('./img/Home.png')} />
    </div>
  )
}

export default Leaderboard