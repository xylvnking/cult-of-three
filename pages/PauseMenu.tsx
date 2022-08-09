import React from 'react'
import styles from '../styles/Main.module.css'

type Props = {}

export default function PauseMenu({}: Props) {
  return (
    <div>
        <main className={styles.pauseMenu}>
            <h1 className={styles.pauseTitle}>GAME PAUSED</h1>
        </main>
    </div>
  )
}