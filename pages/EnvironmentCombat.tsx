import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'
import styles from '../styles/Main.module.css'

const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644'
const towerPhotoUrl = 'https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155'
const dreamstatePhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/033/313/719/large/huleeb-367-28-dec-2020-final-c.jpg?1609171255'

export default function EnvironmentCombat(props:any) {

  const [isEnvironmentIsLoaded, setIsEnvironmentIsLoaded] = React.useState(false)

  

  const [enemy, setEnemy] = React.useState({
    hp: setEnemyHpAccordingToEnvironmentCompleted(),
    attackDamage: 10,
    abilityPower: 10,
    moveSet: ['attack', 'charge', 'buff'],
    currentMove: "",
    isAlive: true
  })

  function playEnvironmentSound() {
    if (props.environmentIndex == 0) {
      props.playEnvironmentOneSound()
    } else if (props.environmentIndex == 1) {
      props.playEnvironmentTwoSound()
    } else if (props.environmentIndex == 2) {
      props.playEnvironmentThreeSound()
    }
  }
  
  function stopEnvironmentSound() {
    if (props.environmentIndex == 0) {
      props.playEnvironmentOneSoundControls.stop()
    } else if (props.environmentIndex == 1) {
      props.playEnvironmentTwoSoundControls.stop()
    } else if (props.environmentIndex == 2) {
      props.playEnvironmentThreeSoundControls.stop()
    }

  }

  function getEnvironmentPhotoUrl () {
    if (props.environmentIndex == 0) {
      return forestPhotoUrl
    } else if (props.environmentIndex == 1) {
      return towerPhotoUrl
    } else if (props.environmentIndex == 2) {
      return dreamstatePhotoUrl
    }
  }

  function setEnemyHpAccordingToEnvironmentCompleted () {
    if (props.environmentProgress.environmentOneComplete == false) {
      return 3
    } else if (props.environmentProgress.environmentTwoComplete == false) {
      return 6
    } else if (props.environmentProgress.environmentThreeComplete == false) {
      return 9
    }
  }
  
  
  useEffect(() => {
    console.log('enemy damaged!')

    let currentEnemyHp = enemy.hp // have to calculate this here since setState is async we can't check for enemy death off 
    
    // this if statement is needed because otherwise the attack damage would happen on load
    if (isEnvironmentIsLoaded) {
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
      // if forest :
      if (props.environmentIndex == 0) {
        props.setEnvironmentProgress(current => {
          return {
              ...current,
              environmentOneComplete: true
          }
        })
      } else if (props.environmentIndex == 1) {
        props.setEnvironmentProgress(current => {
          return {
              ...current,
              environmentTwoComplete: true
          }
        })
      } else if (props.environmentIndex == 2) {
        props.setEnvironmentProgress(current => {
          return {
              ...current,
              environmentThreeComplete: true
          }
        })
      }
      props.resetEverything()

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
      if (props.calculateCurrentPlayerHealth(enemy.attackDamage) !== 0){

        props.enemyAttack()
      }
    }
  }, [props.triggerDamageToPlayer])

  
  // ENTER & LEAVE :: ENVIRONMENT
  useEffect(() => {
      playEnvironmentSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1]) 
      setIsEnvironmentIsLoaded(true)
      return () => {
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          stopEnvironmentSound()
      }
    },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] forest : cultist : health: {enemy.hp}
    </h1>
    <div className={styles.environmentContainer}>

        <Image 
            // src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644" // ENVIRONMENT SPECIFIC
            src={getEnvironmentPhotoUrl()}
            alt=''
            layout="fill"
            objectFit='cover'
        />
    </div>
    <section className={styles.keyMapGridContainer}>
      {/* <p className={`${styles.keyMap} ${(props.input == 'left') && `${styles.keyMapSelected}`}`}> */}
      <p className={`${styles.keyMap} ${(props.enemyCurrentMove == 'left') && `${styles.keyMapSelected}`}`}>
      🗡️
      </p>
      {/* <p className={`${styles.keyMap} ${(props.input == 'center') && `${styles.keyMapSelected}`}`}> */}
      <p className={`${styles.keyMap} ${(props.enemyCurrentMove == 'center') && `${styles.keyMapSelected}`}`}>
      🔫
      </p>
      {/* <p className={`${styles.keyMap} ${(props.input == 'right') && `${styles.keyMapSelected}`}`}> */}
      <p className={`${styles.keyMap} ${(props.enemyCurrentMove == 'right') && `${styles.keyMapSelected}`}`}>
      ✨
      </p>
    </section>
</div>
  )
}