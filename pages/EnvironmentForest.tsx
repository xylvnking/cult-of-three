import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'

import styles from '../styles/Environment.module.css'

export default function EnvironmentForest(props:any) {

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
            environmentOneComplete: true
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
      console.log('entering forest...')
      console.log('entering combat!')
    
      props.playEnvironmentOneSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1]) 
      

      return () => {
          console.log('leaving forest...') // ENVIRONMENT SPECIFIC
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          props.playEnvironmentOneSoundControls.stop() // ENVIRONMENT SPECIFIC
      }
    },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] forest : cultist : health: {enemy.hp}
    </h1>
    <div className={styles.environmentContainer}>

        <Image 
            src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644" // ENVIRONMENT SPECIFIC
            // src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"

            alt='photo of a forest' // ENVIRONMENT SPECIFIC
            layout="fill"
            objectFit='cover'

            // style={{width: '200px'}}
        />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}