import React from 'react'
import styles from '../styles/Main.module.css'

type Props = {}

export default function EndScreen(props:any) {

  return (
    <div>
        <main className={styles.endScreenContainer}>
            <h1 className={styles.endScreenText}>YOUR TIME IS: <span style={{fontWeight: 700}}>{props.score}</span></h1>

            <p className={styles.endScreenSmallText}>The time is calculated by measuring your accuracy against your reaction speed. The lower the better!</p>
            
            {/* <p>After an enemy attacks, the time it takes for you to react is accumulated until you beat the game.</p>
            <p>Once the game is over, that total time is divded by the amount of health you have left.</p>
            <p>The faster you are, the lower your score.</p> */}
            
            <h1 className={styles.endScreenText}>Press the <span style={{fontWeight: 700}}>{props.keyMap.center}</span> key to play again!</h1>
        </main>
    </div>
  )
}