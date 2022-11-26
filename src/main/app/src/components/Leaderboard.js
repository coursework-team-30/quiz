import React from 'react'
import './Leaderboard.css'
import {useNavigate} from 'react-router-dom'

const Leaderboard = () => {

    const table = [];
    for(let i = 1 ; i < 6 ; i++)
        table.push(<div className='table'><h1 className='number'>{i}</h1><div className='row'><p>Tom</p><p>10</p></div></div>)


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