import React from 'react'
import styles from '../styles/Main.module.css'

export default function EndScreen(props:any) {

  return (
    <div>
        <main className={styles.endScreenContainer}>
          {
            props.playerDied 
            ?
            <h1 className={styles.endScreenText}><span style={{fontWeight: 700}}>YOU DIED</span></h1>
            :
            <h1 className={styles.endScreenText}>YOUR TIME IS: <span style={{fontWeight: 700}}>{props.score}</span></h1>
          }
            <p className={styles.endScreenSmallText}>The time is calculated by measuring your accuracy against your reaction speed. The lower the better!</p>
            <h1 className={styles.endScreenText}>Press <span style={{fontWeight: 700}}>any</span> key to play again!</h1>
        </main>
    </div>
  )
}