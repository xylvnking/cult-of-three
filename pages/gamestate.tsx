import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'
import EnvironmentForest from './EnvironmentForest'
import EnvironmentTower from './EnvironmentTower'
import EnvironmentOverworld from './EnvironmentOverworld'
import EnvironmentSafeZone from './EnvironmentSafeZone'
import useSound from 'use-sound';
// import drone from './audio/drone.wav'
// import drone from '../public/drone.wav'

type GameStateProps = {
    // currentKeyPressed:Array<string>
    input:string,
    keyTrigger:boolean,
    children?: React.ReactNode
}

let playerHealthPoints:number = 100
const environments:Array<string> = ['forest', 'city','dreamstate']

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

const gameStates = ['safezone', 'combat', 'paused']


export default function Gamestate(props: GameStateProps) {


    /*

    i think i need functions for each transition to set all the appropriate states and also play sfx


    */
    
    const [environmentIndex, setEnvironmentIndex] = React.useState<number>(3)
    const [enemyState, setEnemyState] = React.useState()
    const [playerHealth, setPlayerHealth] = React.useState(100)
    const [enemy, setEnemy] = React.useState({
        hp: 20,
        moveSet: ['attack', 'charge', 'buff'],
        currentMove: ""
    })
    const [environmentOneSoundIsPlaying, setEnvironmentOneSoundIsPlaying] = React.useState(false)
    const [environmentTwoSoundIsPlaying, setEnvironmentTwoSoundIsPlaying] = React.useState(false)
    const [environmentThreeSoundIsPlaying, setEnvironmentThreeSoundIsPlaying] = React.useState(false)
    const [gamePaused, setGamePaused] = React.useState(false) // i think gamePaused might be redundant now but ill remove it later 
    const [gameState, setGameState] = React.useState(gameStates[0])
    const [isInCombat, setIsInCombat] = React.useState(false)

    const [playEnvironmentOneSound, playEnvironmentOneSoundControls] = useSound('/forest.mp3', {
        volume: 0.5,
        loop: true,
        mute: true
        // playbackRate: 2
    })
    const [playEnvironmentTwoSound, playEnvironmentTwoSoundControls] = useSound('/rain.mp3', {
        volume: 0.5,
        loop: true,
        playbackRate: 2,
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

    const handleEnvironmentSound = () => {
        if (environmentIndex == 0 && (environmentOneSoundIsPlaying == false)) {
            // console.log('environment1soundshouldwork')s
            playEnvironmentOneSound()
            playEnvironmentTwoSoundControls.stop()
            playEnvironmentThreeSoundControls.stop()
            setEnvironmentOneSoundIsPlaying(true)

            setEnvironmentTwoSoundIsPlaying(false)
            setEnvironmentThreeSoundIsPlaying(false)
        }
        else if (environmentIndex == 1 && (environmentTwoSoundIsPlaying == false)) {
            playEnvironmentTwoSound()
            playEnvironmentOneSoundControls.stop()
            playEnvironmentThreeSoundControls.stop()
            setEnvironmentTwoSoundIsPlaying(true)
            
            setEnvironmentOneSoundIsPlaying(false)
            setEnvironmentThreeSoundIsPlaying(false)

        }
        else if (environmentIndex == 2 && (environmentThreeSoundIsPlaying == false)) {
            playEnvironmentThreeSound()
            playEnvironmentOneSoundControls.stop()
            playEnvironmentTwoSoundControls.stop()
            setEnvironmentThreeSoundIsPlaying(true)

            setEnvironmentOneSoundIsPlaying(false)
            setEnvironmentTwoSoundIsPlaying(false)
        }
    }

    const environment = () => {
        handleEnvironmentSound()
        switch (environmentIndex) {
            case 0:
                return  <EnvironmentForest 
                            input={props.input} 
                            keyTrigger={props.keyTrigger} 
                            />
                
            case 1:
                return <EnvironmentTower />
            case 2:
                return <EnvironmentOverworld />
            case 3:
                return <EnvironmentSafeZone />
        }
    }

    const resetEverything = () => {
        // reset everything
        setEnemy(current => {
            return {
                ...current,
                hp: 20,
                currentMove: ""
            }
        })
        setPlayerHealth(100)
    }

    const goToSafeZone = () => {
        setEnvironmentIndex(3)
    }

    const playerDeath = () => {
        console.log('YOU HAVE DIED')
        resetEverything()
    }

    const enemyDeath = () => {
        resetEverything()
        goToSafeZone()
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
            // BATTLE
            else if (!gamePaused && (gameState == 'combat')) { // i think gamepaused might be redundant now but ill remove it later 
                const playerAction = async () => {
                    if (props.input == enemy.currentMove) {
                        setEnemy(current => {
                            return {
                                ...current,
                                hp: enemy.hp - 10
                            }
                        })
                    } else {
                        setPlayerHealth(playerHealth - 10)
                        if (playerHealth == 0) {
                            playerDeath()
                        }
                    }
                    setEnemy(current => {
                        return {
                            ...current,
                            currentMove: ""
                        }
                    })
                    if (enemy.hp == 0) {
                        // put enemy death function here if you need it
                    } else {
    
                        await delay(100)
        
                        enemyAttack()
                    }
                }
                playerAction()
            }   

            // SAFEZONE
            else if (!gamePaused && (gameState == 'safezone')){
                
            }






        }
    }, [props.keyTrigger])

    if (enemy.hp == 0) {
        console.log('you win!')
        enemyDeath()
    }

    const enemyAttack = async () => {
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
        <main className={styles.mainContainer}>

            {environment()}

            <section className={styles.controlGridContainer}>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'leftListen') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>leftListen</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'centerListen') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>centerListen</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'rightListen') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>rightListen</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'rewind') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>rewind</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'left') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>left</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'center') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>center</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'right') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>right</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'fastForward') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>fast forward</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${styles.menu} ${(gamePaused) && `${styles.keyMapGridItemSelected}`}`}>
                    <label>menu</label>
                </button>
            </section>
        
        <p>playerHealth: {playerHealth}</p>
        <p>enemyHealthPoints: {enemy.hp}</p>
        <p>enemyCurrentMove: {enemy.currentMove}</p>
        <p>gameState: {gameState}</p>
        <p>{isInCombat ? 'isInCombat: true' : 'isInCombat: false'}</p>

        <h1>{ gamePaused ? 'PAUSED' : ""}</h1>

        <section className={styles.debugContainer}>

            <button
                onClick={() => setEnvironmentIndex(0)}
            >
                EnvironmentForest [0]
            </button>
            <button
                onClick={() => setEnvironmentIndex(1)}
            >
                EnvironmentTower [1]
            </button>
            <button
                onClick={() => setEnvironmentIndex(2)}
            >
                EnvironmentOverworld [2]
            </button>
            <button
                onClick={() => setEnvironmentIndex(3)}
            >
                EnvironmentSafeZone [3]
            </button>
            
            <button
                onClick={() => toggleEnvironmentSoundMute()}
            >
                toggle environment sound
            </button>

            <button
                onClick={() => enemyAttack()}
            >
                enemyAttack
            </button>
            
            <button
                onClick={() => setGameState(gameStates[0])}
            >
                setGameState: safezone 
            </button>
            <button
                onClick={() => setGameState(gameStates[1])}
            >
                setGameState: combat 
            </button>
            <button
                onClick={() => setGameState(gameStates[2])}
            >
                setGameState: paused 
            </button>
            <button
                onClick={() => setIsInCombat(true)}
            >
                setIsInCombat: true
            </button>
            <button
                onClick={() => setIsInCombat(false)}
            >
                setIsInCombat: false
            </button>
        </section>
        
        </main>
  )
}





