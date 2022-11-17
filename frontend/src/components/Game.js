import React from 'react'
import Header from './Header'
import './Game.css'
import Options from './Options'

const Game = () => {
  return (
    <div className='game'>
        <Header/>
        <h3 className='question'>Question 1</h3>
        <p className='sub-question'>What is the capital of India ?</p>
        <Options/>
        <button className='next-button'>Next Question</button>
    </div>
  )
}

export default Game