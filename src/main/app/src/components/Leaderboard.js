import React from 'react'
import './Leaderboard.css'

const Leaderboard = () => {
  return (
    <div className='lead-container'>
        <h1 className='lead-title'>Leader Board</h1>
        <img className='cupImg' src={require('./img/Media2.png')} />
        <div className='tableHead'>
            <h2 className='nameH2'>Name</h2>
            <h2 className='scoreH2'>Score</h2>
        </div>
    </div>
  )
}

export default Leaderboard