import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'
import styles from '../styles/Main.module.css'

export default function EnvironmentCombat(props:any) {

  const [isEnvironmentIsLoaded, setIsEnvironmentIsLoaded] = useState<boolean>(false)

  const [enemy, setEnemy] = React.useState({
    hp: 10,
    defaultHp: 3,
    attackDamage: 10,
    nameOfAttackingEnemy: "",
    isAlive: true
  })

  // Triggered when the enemy is to take damage
  useEffect(() => {
  
    let currentEnemyHp:number = enemy.hp // have to calculate this here since setState is async we can't check for enemy death off 

    if (isEnvironmentIsLoaded) { // prevents damage from occuring on load
      currentEnemyHp = enemy.hp - props.playerStats.attackDamage
      props.calculateScore()
      setEnemy((current:any) => {
        return {
            ...current,
            hp: currentEnemyHp
        }
      })
    }
    if (currentEnemyHp <= 0) { // ENEMY KILLED
      props.playEndingMusic()
      props.setGameComplete(true)
    } else { // THIS FIRES ON LOAD
      props.enemyAttack()
    }
  }, [props.triggerDamageToEnemy]) 
  
  // Triggered when the player is to take damage
  useEffect(() => {
    if (isEnvironmentIsLoaded) {
      props.calculateScore()
      props.damagePlayer(enemy.attackDamage)
      if (props.calculateCurrentPlayerHealth(enemy.attackDamage) >= 0){
        props.enemyAttack()
      }
    }
  }, [props.triggerDamageToPlayer])

  
  // Triggered when entering and leaving combat
  useEffect(() => {
      props.playCombatEnvironmentSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1]) 
      props.playEnvironmentSafeZoneSoundControls.stop()
      setIsEnvironmentIsLoaded(true)
      return () => {
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          props.playCombatEnvironmentSoundControls.stop()
      }
    },[])

  return (
    <div className={styles.combatEnvironmentMain} aria-hidden="true">
        <section className={`${styles.environmentContainerContainer}`}>
          <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>
              <Image 
                  // src={'https://mj-gallery.com/b3b95f15-84e4-4019-9bd4-6f585c1e9363/grid_0.png'}
                  src="/images/warzone.png"
                  alt='abstract photo of a futuristic warzone'
                  layout="fill"
                  objectFit='cover'
                  className={styles.environmentPhoto}
              />
          </div>
        </section>
    </div>
  )
}