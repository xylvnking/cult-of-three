import React from 'react'
import styles from '../styles/Main.module.css'

type Props = {}

export default function PauseMenu({}: Props) {
  return (
    <div>
        <main className={styles.endScreenContainer}>
            <h1 className={styles.pauseTitle}>GAME PAUSED</h1>
            <h1 className={styles.introScreenText}>This is an audio-game, and a proof of conept of a bigger project which I&apos;m working on.</h1>
            <h1 className={styles.introScreenText}><span style={{fontWeight: 700}}>The only controls required are the A, S, and D keys.</span></h1>
            <h1 className={styles.introScreenText}>Hit <span style={{fontWeight: 700}}>A</span> when you hear the electric enemy. Hit <span style={{fontWeight: 700}}>S</span> when you hear the mechanical enemy. Hit <span style={{fontWeight: 700}}>D</span> when you hear the magic enemy.</h1>
            <h1 className={styles.introScreenText}>After landing 10 attacks, you will see your score which compares how accurate you were against your reaction speed.</h1>
            <h1 className={styles.introScreenText}><span style={{fontWeight: 700}}>You start in the safe zone, and enter combat by hitting the S key.</span></h1>
        </main>
    </div>
  )
}