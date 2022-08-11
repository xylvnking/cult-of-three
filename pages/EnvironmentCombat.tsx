import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'
import styles from '../styles/Main.module.css'

// const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644'
// const towerPhotoUrl = 'https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155'
// const dreamstatePhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/033/313/719/large/huleeb-367-28-dec-2020-final-c.jpg?1609171255'

export default function EnvironmentCombat(props:any) {

  const [isEnvironmentIsLoaded, setIsEnvironmentIsLoaded] = React.useState(false)

  const [enemy, setEnemy] = React.useState({
    hp: 3,
    defaultHp: 3,
    attackDamage: 10,
    nameOfAttackingEnemy: "",
    isAlive: true
  })

  // ENEMY TAKES DAMAGE
  useEffect(() => {
    

    let currentEnemyHp = enemy.hp // have to calculate this here since setState is async we can't check for enemy death off 
    

    if (isEnvironmentIsLoaded) { // prevents damage from occuring on load
    currentEnemyHp = enemy.hp - props.playerStats.attackDamage
    props.calculateScore()
      setEnemy(current => {
        return {
            ...current,
            hp: currentEnemyHp
        }
      })
    }

    // ENEMY KILLED
    if (currentEnemyHp <= 0) {
      props.playEnemyKilledSound()
      props.playEndingMusic()
      
      // if forest :
      if (props.environmentIndex == 0) {
        props.setEnvironmentProgress(current => {
          return {
              ...current,
              environmentOneComplete: true
          }
        })
      } 
      props.setGameComplete(true)
      
      // props.resetEverything()

    } else {
      // THIS FIRES ON LOAD
      props.enemyAttack()
    }
  }, [props.triggerDamageToEnemy]) 
  
  // PLAYER TAKES DAMAGE
  useEffect(() => {
    if (isEnvironmentIsLoaded) {
      props.calculateScore()
      props.damagePlayer(enemy.attackDamage)
      if (props.calculateCurrentPlayerHealth(enemy.attackDamage) >= 0){

        props.enemyAttack()
      }
    }
  }, [props.triggerDamageToPlayer])

  
  // ENTER & LEAVE :: ENVIRONMENT
  useEffect(() => {
      
      props.playCombatEnvironmentSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1]) 
      setIsEnvironmentIsLoaded(true)
      return () => {
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          
          props.playCombatEnvironmentSoundControls.stop()
      }
    },[])

  return (
    <div className={styles.combatEnvironmentMain}>
      {/* <h1 className={styles.environmentLabel}>
        {getEnvironmentAndEnemyInfoForDisplay()}
      </h1> */}
      
        {/* <h1 className={styles.environmentLabel}>
          {getEnvironmentAndEnemyInfoForDisplay()}
        </h1> */}
        <section className={`${styles.environmentContainerContainer}`}>
          <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>

              <Image 
                  src={props.forestPhotoUrl}
                  alt=''
                  layout="fill"
                  objectFit='cover'
                  className={styles.environmentPhoto}
              />
              
          </div>
        </section>
      
      <section className={styles.keyMapGridContainer}>
        {/* <p className={`${styles.keyMap} ${(props.input == 'left') && `${styles.keyMapSelected}`}`}> */}
        <p className={`${styles.keyMap} ${styles.gridBorder} ${(props.nameOfAttackingEnemy == 'left') && `${styles.keyMapSelected}`}`}>
        {/* 🗡️ */}
        {props.keyMap.left}
        </p>
        {/* <p className={`${styles.keyMap} ${(props.input == 'center') && `${styles.keyMapSelected}`}`}> */}
        <p className={`${styles.keyMap} ${styles.gridBorder} ${(props.nameOfAttackingEnemy == 'center') && `${styles.keyMapSelected}`}`}>
        {/* 🔫 */}
        {props.keyMap.center}
        </p>
        {/* <p className={`${styles.keyMap} ${(props.input == 'right') && `${styles.keyMapSelected}`}`}> */}
        <p className={`${styles.keyMap} ${styles.gridBorder} ${(props.nameOfAttackingEnemy == 'right') && `${styles.keyMapSelected}`}`}>
        {/* ✨ */}
        {props.keyMap.right}
        </p>
      </section>

      
    </div>
  )
}