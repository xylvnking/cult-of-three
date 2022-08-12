import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import React, { useState, useRef } from 'react'
import IntroScreen from './IntroScreen'
import GameInput from './GameInput'

const Home: NextPage = () => {

  




  return (
    <div>
        
        {/* {gameStarted && <GameInput 
        setGameStarted={setGameStarted}
        gameStarted={gameStarted}
        
        />}
        {!gameStarted && <IntroScreen 
        setGameStarted={setGameStarted}
        />} */}
        <GameInput
          
        
        />
        
      
      
    </div>
  )
}

export default Home
