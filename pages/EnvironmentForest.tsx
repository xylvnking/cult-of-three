import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'

import styles from '../styles/Environment.module.css'



// type EnvironmentProps = {
//   input:string,
//   keyTrigger:boolean,
//   gameState:string
//   setIsInCombat:void
//   children?: React.ReactNode
// }


export default function EnvironmentForest(props:any) {

  const [isEnvironmentIsLoaded, setIsEnvironmentIsLoaded] = React.useState(false)
  
  /*

    need to figure out how to pass the input/attacks/health data down to these components

    like right now enemyOne is not actually being affected by the players attacks
    so the hp can't be checked and everything reset like it's currently doing

    i dont think i want to have the enemy data sit up top, because it's not relevant outside of this environment
    so i can figure this out i think to keep things appropriately separate

  */

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

    // i think i can use useRef here but ill do it with my current tools


    if (isEnvironmentIsLoaded) {

      setEnemy(current => {
        return {
            ...current,
            hp: enemy.hp - props.playerStats.attackDamage
        }
      })
    }


    if (enemy.hp == 0) {
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
      props.damagePlayer(enemy.attackDamage)
      props.enemyAttack()
    }
  }, [props.triggerDamageToPlayer])

  
  useEffect(() => {
      console.log('entering forest...')
      console.log('entering combat!')
    
      props.playEnvironmentOneSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1])
      

      return () => {
          console.log('leaving forest...')
          setIsEnvironmentIsLoaded(false)
          props.setIsInCombat(false)
          props.playEnvironmentOneSoundControls.stop()
      }
    },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] forest : cultist : health: {enemy.hp}
    </h1>
    <div className={styles.environmentContainer}>

        <Image 
            src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644"
            // src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"

            alt='photo of a forest'
            layout="fill"
            objectFit='cover'

            // style={{width: '200px'}}
        />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}