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

  /*

    need to figure out how to pass the input/attacks/health data down to these components

    like right now enemyOne is not actually being affected by the players attacks
    so the hp can't be checked and everything reset like it's currently doing

    i dont think i want to have the enemy data sit up top, because it's not relevant outside of this environment
    so i can figure this out i think to keep things appropriately separate

  */

  const [enemyOne, setEnemyOne] = React.useState({
    hp: 50,
    moveSet: ['attack', 'charge', 'buff'],
    currentMove: "",
    isAlive: true
  })

  if (enemyOne.hp == 0) {
    props.resetEverything()
  }





  useEffect(() => {

    // you need to take some of the battle use effect if else shit and put it here


    props.damageEnemy(enemyOne, 10)
  }, [props.input])
  
  useEffect(() => {
      console.log('entering forest...')
      console.log('entering combat!')
    
      props.playEnvironmentOneSound()
      props.setIsInCombat(true)
      props.setGameState(props.gameStates[1])
      props.enemyAttack()

      return () => {
          console.log('leaving forest...')
          props.setIsInCombat(false)
          props.playEnvironmentOneSoundControls.stop()
      }
    },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] forest : cultists
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