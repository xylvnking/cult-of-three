import React, { useEffect } from 'react'
import styles from '../styles/Main.module.css'

export default function IntroScreen(props:any) {
	
	function startGame() {
    props.increaseScuffedGameStartCounter()
    document.addEventListener('keydown', (e: KeyboardEvent) => props.increaseScuffedGameStartCounter())
    props.playEnvironmentSafeZoneSound()
  }

  return (
    <div>
        <main 
          className={styles.endScreenContainer}
        >
          <h1 className={styles.introScreenBigText}>WELCOME TO <span style={{fontWeight: 700}}>CULT OF THREE</span></h1>
          <h1 className={styles.introScreenText}>This is an audio-game, and a proof of concept of a bigger project which I&apos;m working on.</h1>
          <h1 className={styles.introScreenText}><span style={{fontWeight: 700}}>The only controls required are the A, S, and D keys. You can press SPACE at any time to hear these instructions again, or refresh the page to restart.</span></h1>
          <h1 className={styles.introScreenText}>Hit <span style={{fontWeight: 700}}>A</span> when you hear the fire enemy on the left. Hit <span style={{fontWeight: 700}}>S</span> when you hear the mechanical enemy in the center. Hit <span style={{fontWeight: 700}}>D</span> when you hear the magic enemy on the right.</h1>
          <h1 className={styles.introScreenText}>After landing 10 attacks, you will see your score which compares how accurate you were against your reaction speed.</h1>
          <h1 className={styles.introScreenText}><span style={{fontWeight: 700}}>You start in the safe zone where you will hear a campfire, a radio, and forest sounds. When in the safe zone, enter combat by hitting the S key.</span></h1>
          <button
            onClick={() => startGame()}
            style={{ fontSize: '40px', marginTop: '20px'}}
          >
            CLICK THIS BUTTON TO START THE GAME
          </button>
        </main>
    </div>
  )
}