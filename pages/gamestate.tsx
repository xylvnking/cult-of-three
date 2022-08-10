import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'

import EnvironmentCombat from './EnvironmentCombat'
import EnvironmentSafeZone from './EnvironmentSafeZone'
import PauseMenu from './PauseMenu'
import Timer from './Timer'
import EndScreen from './EndScreen'
import useSound from 'use-sound';
import Image from 'next/image'
// import drone from './audio/drone.wav'
// import drone from '../public/drone.wav'

type GameStateProps = {
    // currentKeyPressed:Array<string>
    input:string,
    // setInput:object,
    keyTrigger:boolean,
    
    children?: React.ReactNode
}

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

const gameStates = ['safezone', 'combat', 'paused']

const defaultPlayerHealth:number = 100

const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644'
// const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/047/763/043/large/zhong-yang-.jpg?1648396136'

const towerPhotoUrl = 'https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155'
const dreamStatePhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/033/313/719/large/huleeb-367-28-dec-2020-final-c.jpg?1609171255'


export default function Gamestate(props:any) {

    /*

        i have to have the data for the current move available here, so that I can compare the players input against it
        
        i could encapsulate that check inside of a function and pass it as props to the environment and pass the enemy.currentMove as an argument

    */

    const [enemyAttackDelayTime, setEnemyAttackDelayTime] = React.useState(500)
   
    const [timerTotal, setTimerTotal] = React.useState(0)
    const [timerInitial, setTimerInitial] = React.useState(0)
    const [timerFinal, setTimerFinal] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [environmentIndex, setEnvironmentIndex] = React.useState<number>(3)
    const [enemyState, setEnemyState] = React.useState()
    const [playerHealth, setPlayerHealth] = React.useState(100)
    const [enemy, setEnemy] = React.useState({
        hp: 20,
        attackDamage: 10,
        abilityPower: 10,
        moveSet: ['attack', 'charge', 'buff'],
        currentMove: ""
    })
    const [environmentOneSoundIsPlaying, setEnvironmentOneSoundIsPlaying] = React.useState(false)
    const [environmentTwoSoundIsPlaying, setEnvironmentTwoSoundIsPlaying] = React.useState(false)
    const [environmentThreeSoundIsPlaying, setEnvironmentThreeSoundIsPlaying] = React.useState(false)
    const [gamePaused, setGamePaused] = React.useState(false) // i think gamePaused might be redundant now but ill remove it later 
    const [gameState, setGameState] = React.useState(gameStates[0])
    const [isInCombat, setIsInCombat] = React.useState(false)
    const [gameComplete, setGameComplete] = React.useState(false)
    const [triggerDamageToEnemy, setTriggerDamageToEnemy] = React.useState(true)
    const [triggerDamageToPlayer, setTriggerDamageToPlayer] = React.useState(true)
    const [playerStats, setPlayerStats] = React.useState({
        health: defaultPlayerHealth,
        attackDamage: 100
    })
    const [environmentProgress, setEnvironmentProgress] = React.useState({
        environmentOneComplete: false,
        environmentTwoComplete: false,
        environmentThreeComplete: false,
    })

    const [playEnvironmentOneSound, playEnvironmentOneSoundControls] = useSound('/forest.mp3', {
        volume: 0.5,
        loop: true,
        mute: true // change this obviously when not developing
    })
    const [playEnvironmentTwoSound, playEnvironmentTwoSoundControls] = useSound('/rain.mp3', {
        volume: 0.5,
        loop: true,
        mute: true
    })
    const [playEnvironmentThreeSound, playEnvironmentThreeSoundControls] = useSound('/drone.wav', {
        volume: 0.5,
        loop: true,
        playbackRate: .5,
        mute: true
        
    })

    const toggleEnvironmentSoundMute = () => {
        playEnvironmentOneSoundControls.sound.mute(!playEnvironmentOneSoundControls.sound._muted)
        playEnvironmentTwoSoundControls.sound.mute(!playEnvironmentTwoSoundControls.sound._muted)
        playEnvironmentThreeSoundControls.sound.mute(!playEnvironmentThreeSoundControls.sound._muted)
    }

    const environment = () => {
        if (environmentIndex < 3) {
            return <EnvironmentCombat 
                        input={props.input} 
                        keyMap={props.keyMap}
                        keyTrigger={props.keyTrigger} 
                        gameStates={gameStates}
                        gameState={gameState}
                        setGameState={setGameState}
                        gamePaused={gamePaused}
                        setIsInCombat={setIsInCombat}
                        environmentIndex={environmentIndex}
                        playEnvironmentOneSound={playEnvironmentOneSound}
                        playEnvironmentTwoSound={playEnvironmentTwoSound}
                        playEnvironmentThreeSound={playEnvironmentThreeSound}
                        playEnvironmentOneSoundControls={playEnvironmentOneSoundControls}
                        playEnvironmentTwoSoundControls={playEnvironmentTwoSoundControls}
                        playEnvironmentThreeSoundControls={playEnvironmentThreeSoundControls}
                        resetEverything={resetEverything}
                        enemyCurrentMove={enemy.currentMove}
                        enemyAttack={enemyAttack}
                        triggerDamageToEnemy={triggerDamageToEnemy}
                        triggerDamageToPlayer={triggerDamageToPlayer}
                        damagePlayer={damagePlayer}
                        playerStats={playerStats}
                        calculateScore={calculateScore}
                        environmentProgress={environmentProgress}
                        setEnvironmentProgress={setEnvironmentProgress}
                        calculateCurrentPlayerHealth={calculateCurrentPlayerHealth}
                        forestPhotoUrl={forestPhotoUrl}
                        towerPhotoUrl={towerPhotoUrl}
                        dreamStatePhotoUrl={dreamStatePhotoUrl}
                    />
        } else {
            return <EnvironmentSafeZone />
        }

    }

    useEffect(() => {
        if (
            environmentProgress.environmentOneComplete == true
            &&
            environmentProgress.environmentTwoComplete == true
            &&
            environmentProgress.environmentThreeComplete == true
        ) {
            console.log('game complete')
            setGameComplete(true)
            setTimerTotal(0)
            setTimerInitial(0)
            setTimerFinal(0)
        }
    },[environmentProgress])

    const resetEverything = () => {
        setEnemy(current => {
            return {
                ...current,
                currentMove: " "
            }
        })
        setPlayerStats(current => {
            return {
                ...current,
                health: defaultPlayerHealth,
            }
        })
        
        if (gameComplete) {
            setEnvironmentProgress({
                    environmentOneComplete: false,
                    environmentTwoComplete: false,
                    environmentThreeComplete: false,
            })
            setScore(0)
            setGameComplete(false)


        }

        setIsInCombat(false)
        goToSafeZone()
        
    }
    
    const goToSafeZone = () => {
        setEnvironmentIndex(3)
        setGameState(gameStates[0])
    }


    const calculateCurrentPlayerHealth = (enemyAttackDamage:number) => {
        return playerStats.health - enemyAttackDamage
    }

    const damagePlayer = (enemyAttackDamage:number) => {
        calculateCurrentPlayerHealth(enemyAttackDamage)
        setPlayerStats(current => {
            return {
                ...current,
                health: calculateCurrentPlayerHealth(enemyAttackDamage),
            }
        })
        if (calculateCurrentPlayerHealth(enemyAttackDamage) <= 0) {
            resetEverything()
        }
    }

    const calculateScore = () => {
        setScore((timerTotal / playerStats.health))
    }

    // TRIGGERED ON USER INPUT
    useEffect(() => {
        if (props.input) {

            // PAUSED
            if (props.input == 'menu') {
                setGamePaused(!gamePaused)
                // if the game is not paused, set the game state to paused
                if (!gamePaused) {
                    setGameState(gameStates[2])
                // if the game is paused and we are in combat, set the game state back to combat
                } else if (gamePaused && isInCombat) {
                    setGameState(gameStates[1])
                // if the game is paused and we are not in combat, set the game state back to safezone
                } else if (gamePaused && !isInCombat) {
                    setGameState(gameStates[0])
                }
            } 

            // COMBAT !!
            else if (!gamePaused && (gameState == 'combat')) { // i think gamepaused might be redundant now but ill remove it later 

                let x = new Date().getTime()
                setTimerFinal(x)
                let y = x - timerInitial
                setTimerTotal(timerTotal + y)

                const playerAction = async () => {
                    if (props.input == enemy.currentMove) {
                        // toggles a change in state data which is passed as a prop in environment, triggering a useEffect which then applies damage to that environment's enemy object
                        setTriggerDamageToEnemy(!triggerDamageToEnemy)
                    } else {
                        setTriggerDamageToPlayer(!triggerDamageToPlayer)
                    }
                    setEnemy(current => {
                        return {
                            ...current,
                            currentMove: ""
                        }
                    })
                    console.log('calculate')
                }
                playerAction()
            }   

            // SAFEZONE
            else if (!gamePaused && (gameState == 'safezone')){
                // if enemy 1 alive, 's' enters forest
                if (!environmentProgress.environmentOneComplete) {
                    setEnvironmentIndex(0)
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                } else if (!environmentProgress.environmentTwoComplete) {
                    setEnvironmentIndex(1)
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                } else if (!environmentProgress.environmentThreeComplete) {
                    setEnvironmentIndex(2)
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                } else {
                    console.log('yerrrr')
                    resetEverything()
                }

            }






        }
    }, [props.keyTrigger])

    const enemyAttack = async () => {
        let x = new Date().getTime()
        setTimerInitial(x)

        await delay(enemyAttackDelayTime)

        const enemyMoveNumber = getRandomInt(3)
        const enemyAttacksLeft = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'left'
                }
            })
        }
        const enemyAttacksCenter = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'center'
                }
            })
        }
        const enemyAttacksRight = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'right'
                }
            })
        }

        if (enemyMoveNumber == 0) {
            enemyAttacksLeft()
        } else if (enemyMoveNumber == 1) {
            enemyAttacksCenter()
        } else {
            enemyAttacksRight()
        }
    }

    return (
        <main 
        className={styles.mainContainer}
        // style={{
        //     backgroundImage: `url('${forestPhotoUrl}')`
        // }}
        >
            <section className={styles.keyMapGridContainer}>
                <div
                className={`${styles.enemyIcon} ${environmentProgress.environmentOneComplete ? styles.enemyIconDefeated : ""}`}
                style={{
                    backgroundImage: `url('${forestPhotoUrl}')`,}}>
                            <p 
                            className={`${styles.enemyIconText}`}>
                                {!environmentProgress.environmentOneComplete ? '🧟':'💀' }
                            </p>
                </div>
                <div
                className={`${styles.enemyIcon} ${environmentProgress.environmentTwoComplete ? styles.enemyIconDefeated : ""}`}
                style={{
                    backgroundImage: `url('${towerPhotoUrl}')`,}}>
                            <p 
                            className={`${styles.enemyIconText}`}>
                                {!environmentProgress.environmentTwoComplete ? '🦍':'💀' }
                            </p>
                </div>
                <div
                className={`${styles.enemyIcon} ${environmentProgress.environmentThreeComplete ? styles.enemyIconDefeated : ""}`}
                style={{
                    backgroundImage: `url('${dreamStatePhotoUrl}')`,}}>
                            <p 
                            className={`${styles.enemyIconText}`}>
                                {!environmentProgress.environmentThreeComplete ? '👻':'💀' }
                            </p>
                </div>
            </section>

            {environment()}

        {!isInCombat
         &&  
            <section className={styles.keyMapGridContainer}>
                {/* <p className={`${styles.keyMap} ${(props.input == 'left') && `${styles.keyMapSelected}`}`}> */}
                <p className={`${styles.keyMap}`}>
                
                </p>
                {/* <p className={`${styles.keyMap} ${(props.input == 'center') && `${styles.keyMapSelected}`}`}> */}
                <p className={`${styles.keyMap}`}>
                SKIP
                </p>
                {/* <p className={`${styles.keyMap} ${(props.input == 'right') && `${styles.keyMapSelected}`}`}> */}
                <p className={`${styles.keyMap}`}>
                
                </p>
            </section>
         }

        <section className={styles.healthBarContainer}>
        <p className={styles.healthBarLabel}>Player Health: {playerStats.health}</p>
        <div 
          className={styles.healthBar}
          style={{
          width: `${playerStats.health}%`,
          }}>
          </div>
      </section>
        <Timer 
        timerTotal={timerTotal}
        />
        



        <h1>{ gamePaused ? <PauseMenu /> : ""}</h1>
        <h1>
            { 
            gameComplete 
            ? <EndScreen 
                score={score}
                keyMap={props.keyMap}
            /> 
            : 
            ""
            }
            </h1>
        {/* <p>{score}</p> */}
        </main>
  )
}





