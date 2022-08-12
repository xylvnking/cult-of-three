import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'

import EnvironmentCombat from './EnvironmentCombat'
import EnvironmentSafeZone from './EnvironmentSafeZone'
import PauseMenu from './PauseMenu'
import Timer from './Timer'
import EndScreen from './EndScreen'
import useSound from 'use-sound';
import Image from 'next/image'
import { truncate } from 'fs'
import IntroScreen from './IntroScreen'
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

const defaultPlayerHealth:number = 2

// const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644'
const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/052/484/597/large/huyang-5547.jpg?1659930152'
// const cultistPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/001/953/729/large/mark-van-haitsma-skull-g-sm.jpg?1455091171'

// const forestPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/047/763/043/large/zhong-yang-.jpg?1648396136'

const towerPhotoUrl = 'https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155'
// const brutePhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/001/115/499/large/frederic-daoust-big-dog-3.jpg?1443928827'
const dreamStatePhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/033/313/719/large/huleeb-367-28-dec-2020-final-c.jpg?1609171255'
// const elderPhotoUrl = 'https://cdnb.artstation.com/p/assets/images/images/035/006/675/large/aleksandra-alekseeva-love-signature.jpg?1613847121'


const brutePhotoUrl = 'https://mj-gallery.com/5c17343d-0603-4010-ae3e-22781ba989ec/grid_0.png'
const cultistPhotoUrl = 'https://mj-gallery.com/9c40ea5a-078f-4faf-9d11-18e710bd8116/grid_0.png'
const elderPhotoUrl = 'https://mj-gallery.com/a8e5978d-d5ac-4cf6-a6ca-90d5c1ff0dac/grid_0.png'

export default function Gamestate(props:any) {
    

    /*
        i have to have the data for the current move available here, so that I can compare the players input against it
        
        i could encapsulate that check inside of a function and pass it as props to the environment and pass the enemy.nameOfAttackingEnemy as an argument
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
        nameOfAttackingEnemy: ""
    })
    const [gamePaused, setGamePaused] = React.useState(false) // i think gamePaused might be redundant now but ill remove it later 
    const [gameState, setGameState] = React.useState(gameStates[0])
    const [isInCombat, setIsInCombat] = React.useState(false)
    const [gameComplete, setGameComplete] = React.useState(false)
    const [triggerDamageToEnemy, setTriggerDamageToEnemy] = React.useState(true)
    const [triggerDamageToPlayer, setTriggerDamageToPlayer] = React.useState(true)
    const [playerStats, setPlayerStats] = React.useState({
        health: defaultPlayerHealth,
        attackDamage: 1
    })
    const [currentRound, setCurrentRound] = React.useState(1)
    const [environmentProgress, setEnvironmentProgress] = React.useState({
        environmentOneComplete: false,
        environmentTwoComplete: false,
        environmentThreeComplete: false,
    })

    
    const [scuffedGameStartCounter, setScuffedGameStartCounter] = React.useState(0)
    

    const soundMuted = false

    const [playEndingMusic, playEndingMusicControls] = useSound('/EndingMusic3.wav', {
        volume: .7,
        loop: true,
        mute: soundMuted
    })
    const [playCombatEnvironmentSound, playCombatEnvironmentSoundControls] = useSound('/rain.mp3', {
        volume: 0.5,
        loop: true,
        mute: soundMuted
    })
    const [playEnvironmentSafeZoneSound, playEnvironmentSafeZoneSoundControls] = useSound('/music.mp3', {
        volume: 0.5,
        loop: true,
        playbackRate: 1,
        mute: soundMuted
        
    })

    const [playEnemyAttackOneSound, playAttackOneSoundControls] = useSound('/breach2.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    const [playAttackTwoSound, playAttackTwoSoundControls] = useSound('/omen.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    const [playAttackThreeSound, playAttackThreeSoundControls] = useSound('/reyna1.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    function playEnemyAttackSound() {
        switch(enemy.nameOfAttackingEnemy) {
            case 'left':
                playEnemyAttackOneSound()
                break;
            case 'center':
                playAttackTwoSound()
                break;
            case 'right':
                playAttackThreeSound()
                break;
                
            }
        }
    const [playPlayerAttackOneSound, playPlayerAttackOneSoundControls] = useSound('/CultistHeavy.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    const [playPlayerAttackTwoSound, playPlayerAttackTwoSoundControls] = useSound('/BruteHeavy.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    const [playPlayerAttackThreeSound, playPlayerAttackThreeSoundControls] = useSound('/ElderHeavy.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted
    })
    function playPlayerAttackSound() {
        switch(enemy.nameOfAttackingEnemy) {
            case 'left':
                playPlayerAttackOneSound()
                break;
            case 'center':
                playPlayerAttackTwoSound()
                break;
            case 'right':
                playPlayerAttackThreeSound()
                break;

        }
    }
    function stopAttackSound() {
        playAttackOneSoundControls.stop()
        playAttackTwoSoundControls.stop()
        playAttackThreeSoundControls.stop()
    }

    useEffect(() => {
        playEnemyAttackSound()
    },[enemy.nameOfAttackingEnemy])

    // const [playPlayerDamagedSound, playPlayerDamagedSoundControls] = useSound('/playerTakeDamageSfx.mp3', {
    const [playPlayerDamagedSound, playPlayerDamagedSoundControls] = useSound('/headshotSound.mp3', {
        volume: .7,
        loop: false,
        mute: soundMuted
    })
    const [playEnemyDamagedSound, playEnemyDamagedSoundControls] = useSound('/lock.wav', {
    // const [playEnemyDamagedSound, playEnemyDamagedSoundControls] = useSound('/operatorTap.mp3', {
    // const [playEnemyDamagedSound, playEnemyDamagedSoundControls] = useSound('/successSfx.mp3', {
        volume: 1,
        loop: false,
        mute: soundMuted,
        playbackRate: currentRound
    })
    const [playEnemyKilledSound, playEnemyKilledSoundControls] = useSound('/ace.mp3', {
        volume: 0,
        loop: false,
        mute: soundMuted
    })


    // toggleEnvironmentSoundMute()

    const environment = () => {
        if (environmentIndex < 3) {
            return <EnvironmentCombat 
                        // you should put a lot of this into one object and pass that in, i think. as 'settings' or something
                        input={props.input} 
                        keyMap={props.keyMap}
                        keyTrigger={props.keyTrigger} 
                        gameStates={gameStates}
                        gameState={gameState}
                        setGameState={setGameState}
                        gamePaused={gamePaused}
                        setIsInCombat={setIsInCombat}
                        environmentIndex={environmentIndex}
                        playCombatEnvironmentSound={playCombatEnvironmentSound}
                        
                        playCombatEnvironmentSoundControls={playCombatEnvironmentSoundControls}
                        
                        resetEverything={resetEverything}
                        nameOfAttackingEnemy={enemy.nameOfAttackingEnemy}
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
                        soundMuted={soundMuted}
                        playEnemyKilledSound={playEnemyKilledSound}
                        setGameComplete={setGameComplete}
                        playEndingMusic={playEndingMusic}
                        playEnvironmentSafeZoneSoundControls={playEnvironmentSafeZoneSoundControls}
                    />
        } else {
            return <EnvironmentSafeZone 
                        playEnvironmentSafeZoneSoundControls={playEnvironmentSafeZoneSoundControls}
                        playEnvironmentSafeZoneSound={playEnvironmentSafeZoneSound}
                        playEnemyDamagedSoundControls={playEnemyDamagedSoundControls}
                    />
        }

    }

    const resetEverything = () => {
        
        setEnemy(current => {
            return {
                ...current,
                nameOfAttackingEnemy: " "
            }
        })
        setPlayerStats(current => {
            return {
                ...current,
                health: defaultPlayerHealth,
            }
        })
        setCurrentRound(1)
        
        if (gameComplete) {
            setScore(0)
            setTimerTotal(0)
            setTimerInitial(0)
            setTimerFinal(0)
            playEndingMusicControls.stop()
            
            setGameComplete(false)
            setEnvironmentProgress(current => {
              return {
                  ...current,
                  environmentOneComplete: false
              }
            })
           


        }

        setIsInCombat(false)
        // goToSafeZone()
        setEnvironmentIndex(3)
        setGameState(gameStates[0])
        
    }

    useEffect(() => {
        setGameState('safezone')
        playCombatEnvironmentSoundControls.stop()
    }, [gameComplete])

    const calculateCurrentPlayerHealth = (enemyAttackDamage:number) => {
        return playerStats.health - enemyAttackDamage
    }

    const damagePlayer = (enemyAttackDamage:number) => {
        playPlayerDamagedSound()
        calculateCurrentPlayerHealth(enemyAttackDamage)
        setPlayerStats(current => {
            return {
                ...current,
                health: calculateCurrentPlayerHealth(enemyAttackDamage),
            }
        })
        if (calculateCurrentPlayerHealth(enemyAttackDamage) <= 0) {
            if (environmentIndex == 0) {
                setEnvironmentProgress(current => {
                  return {
                      ...current,
                      environmentOneComplete: true
                  }
                })
              } 
              setGameComplete(true)
        }
    }

    const calculateScore = () => {
        setScore((timerTotal / playerStats.health))
    }

    function increaseScuffedGameStartCounter() {
        setScuffedGameStartCounter(current => {
            return current + 1
                
            
        })

        if (scuffedGameStartCounter >= 2) {
            // playEnvironmentSafeZoneSoundControls.stop()
            console.log('called')
        }
    }

    useEffect(() => {
        if (props.input ) {
            increaseScuffedGameStartCounter()
            
            
            // PAUSED
            if (props.input == 'menu' && scuffedGameStartCounter >= 2 && !gameComplete) {
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
            else if (!gamePaused && (gameState == 'combat') && scuffedGameStartCounter >= 2) { // i think gamepaused might be redundant now but ill remove it later
                
                stopAttackSound()
                

                let x = new Date().getTime()
                setTimerFinal(x)
                let y = x - timerInitial
                setTimerTotal(timerTotal + y)

                const playerAction = async () => {
                    if (props.input == enemy.nameOfAttackingEnemy) {
                        playEnemyDamagedSound()
                        setCurrentRound(currentRound + .1)


                        playPlayerAttackSound()


                        // toggles a change in state data which is passed as a prop in environment, triggering a useEffect which then applies damage to that environment's enemy object
                        setTriggerDamageToEnemy(!triggerDamageToEnemy)
                    } else {
                        setTriggerDamageToPlayer(!triggerDamageToPlayer)
                    }
                    setEnemy(current => {
                        return {
                            ...current,
                            nameOfAttackingEnemy: ""
                        }
                    })
                    
                }
                playerAction()
            }   

            // SAFEZONE
            else if (!gamePaused && (gameState == 'safezone') && scuffedGameStartCounter >= 2){
                // if enemy 1 alive, 's' enters forest
                if (!gameComplete) {
                    setEnvironmentIndex(0)
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                } else if (gameComplete) {
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                    resetEverything()
                }

            }






        }
    }, [props.keyTrigger])

    const enemyAttack = async () => {
        let x = new Date().getTime()
        setTimerInitial(x)

        await delay(enemyAttackDelayTime)
        playEnemyDamagedSoundControls.stop()

        const enemyMoveNumber = getRandomInt(3)
        const enemyAttacksLeft = () => {
            setEnemy(current => {
                return {
                    ...current,
                    nameOfAttackingEnemy: 'left'
                }
            })
            
        }
        const enemyAttacksCenter = () => {
            setEnemy(current => {
                return {
                    ...current,
                    nameOfAttackingEnemy: 'center'
                }
            })
            
        }
        const enemyAttacksRight = () => {
            setEnemy(current => {
                return {
                    ...current,
                    nameOfAttackingEnemy: 'right'
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
        >
            <section className={styles.keyMapGridContainer}>
                <div
                className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'left') && `${styles.keyMapSelected}`}`}
                
                style={{
                    backgroundImage: `url('${cultistPhotoUrl}')`,
                    backgroundPosition: 'top'}}
                    >

                </div>
                <div
                className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'center') && `${styles.keyMapSelected}`}`}
                style={{
                    backgroundImage: `url('${brutePhotoUrl}')`,
                    backgroundPosition: 'top'}}>
                    

                </div>
                <div
                className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'right') && `${styles.keyMapSelected}`}`}
                style={{
                    backgroundImage: `url('${elderPhotoUrl}')`,}}>

                </div>
            </section>

            {environment()}

        {/* {!isInCombat
         &&  
            <section className={styles.keyMapGridContainer}>
                <p className={`${styles.keyMap} ${styles.gridBorder}`}>
                
                </p>
                <p className={`${styles.keyMap} ${styles.gridBorder}`}>
                 {props.keyMap.center}
                </p>
                <p className={`${styles.keyMap} ${styles.gridBorder}`}>
                
                </p>
            </section>
         } */}
        { gamePaused ? <PauseMenu /> : ""}
        
            { 
            gameComplete 
            ? <EndScreen 
                score={score}
                keyMap={props.keyMap}
            /> 
            : 
            ""
            }
        { scuffedGameStartCounter < 1 ? <IntroScreen 
        increaseScuffedGameStartCounter={increaseScuffedGameStartCounter}
        playEnvironmentSafeZoneSound={playEnvironmentSafeZoneSound}
        
        
        /> : ""}
        </main>
  )
}