import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'

// import styles from '../styles/Environment.module.css'
import styles from '../styles/Main.module.css'


export default function EnvironmentTower(props:any) {

  const [isEnvironmentIsLoaded, setIsEnvironmentIsLoaded] = React.useState(false)

  const [enemy, setEnemy] = React.useState({
    hp: 50,
    attackDamage: 10,
    abilityPower: 10,
    moveSet: ['attack', 'charge', 'buff'],
    currentMove: "",
    isAlive: true
  })


  
  
  useEffect(() => {
    console.log('enemy damaged!')

    // this if statement is needed because otherwise the attack damage would happen on load
    if (isEnvironmentIsLoaded) {
      props.calculateScore()
      setEnemy(current => {
        return {
            ...current,
            hp: enemy.hp - props.playerStats.attackDamage
        }
      })
    }


    if (enemy.hp == 0) {
      props.setEnvironmentProgress(current => {
        return {
            ...current,
            environmentTwoComplete: true
        }
      })
      props.resetEverything()

    // THIS FIRES ON LOAD
    } else {
      console.log(enemy.hp)
      setIsEnvironmentIsLoaded(true)
      props.enemyAttack()
      
    }
  }, [props.triggerDamageToEnemy]) 
  
  
  useEffect(() => {
    if (isEnvironmentIsLoaded) {
      props.calculateScore()
      props.damagePlayer(enemy.attackDamage)
      if (props.calculateCurrentPlayerHealth(enemy.attackDamage) !== 0){

        props.enemyAttack()
      }
      // console.log(` PLAYER HEALTH IS :::: ${props.calculateCurrentPlayerHealth(enemy.attackDamage)}`)
      
    }
  }, [props.triggerDamageToPlayer])

  
  useEffect(() => {
      console.log('entering tower...')
      console.log('entering combat!')
    
      props.playEnvironmentTwoSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1]) 
      

      return () => {
          console.log('leaving tower...') // ENVIRONMENT SPECIFIC
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          props.playEnvironmentTwoSoundControls.stop() // ENVIRONMENT SPECIFIC
      }
    },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] tower : brute : health: {enemy.hp}
    </h1>
    <div className={styles.environmentContainer}>

        <Image 
            src="https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155" // ENVIRONMENT SPECIFIC
            // src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"

            alt='photo of a tower' // ENVIRONMENT SPECIFIC
            layout="fill"
            objectFit='cover'

            // style={{width: '200px'}}
        />
    </div>
    <section className={styles.keyMapGridContainer}>
      <p className={`${styles.keyMap} ${(props.input == 'left') && `${styles.keyMapSelected}`}`}>
      🗡️
      </p>
      <p className={`${styles.keyMap} ${(props.input == 'center') && `${styles.keyMapSelected}`}`}>
      🔫
      </p>
      <p className={`${styles.keyMap} ${(props.input == 'right') && `${styles.keyMapSelected}`}`}>
      ✨
      </p>
    </section>
</div>
  )
}