import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'

import EnvironmentForest from './EnvironmentForest'
import EnvironmentTower from './EnvironmentTower'
import EnvironmentOverworld from './EnvironmentOverworld'
import EnvironmentSafeZone from './EnvironmentSafeZone'
import PauseMenu from './PauseMenu'
import Timer from './Timer'
import useSound from 'use-sound';
// import drone from './audio/drone.wav'
// import drone from '../public/drone.wav'

type GameStateProps = {
    // currentKeyPressed:Array<string>
    input:string,
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


export default function Gamestate(props: GameStateProps) {
   
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
    const [triggerDamageToEnemy, setTriggerDamageToEnemy] = React.useState(true)
    const [triggerDamageToPlayer, setTriggerDamageToPlayer] = React.useState(true)
    const [playerStats, setPlayerStats] = React.useState({
        health: defaultPlayerHealth,
        attackDamage: 10
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
        switch (environmentIndex) {
            case 0:
                return  <EnvironmentForest 
                            // make sure these are all in use 
                            input={props.input} 
                            keyTrigger={props.keyTrigger} 
                            gameStates={gameStates}
                            gameState={gameState}
                            setGameState={setGameState}
                            gamePaused={gamePaused}
                            setIsInCombat={setIsInCombat}
                            playEnvironmentOneSound={playEnvironmentOneSound}
                            playEnvironmentOneSoundControls={playEnvironmentOneSoundControls}
                            resetEverything={resetEverything}
                            enemyCurrentMove={enemy.currentMove}
                            enemyAttack={enemyAttack}
                            triggerDamageToEnemy={triggerDamageToEnemy}
                            triggerDamageToPlayer={triggerDamageToPlayer}
                            damagePlayer={damagePlayer}
                            playerStats={playerStats}
                            calculateScore={calculateScore}
                            setEnvironmentProgress={setEnvironmentProgress}
                            calculateCurrentPlayerHealth={calculateCurrentPlayerHealth}
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
                currentMove: " "
            }
        })
        setPlayerStats(current => {
            return {
                ...current,
                health: defaultPlayerHealth,
            }
        })
        
        // setPlayerHealth(100)
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
        
        
        // const calculateCurrentPlayerHealth = () => {
        //     return playerStats.health - enemyAttackDamage
        // }
        calculateCurrentPlayerHealth(enemyAttackDamage)
        
        // let currentPlayerHealth = playerStats.health - enemyAttackDamage
        
        setPlayerStats(current => {
            return {
                ...current,
                health: calculateCurrentPlayerHealth(enemyAttackDamage),
            }
        })
        
        // setPlayerHealth(playerHealth - enemyAttackDamage)
        // if ((playerStats.health - enemyAttackDamage) == 0) {
        if (calculateCurrentPlayerHealth(enemyAttackDamage) == 0) {
            resetEverything()
        }
    }

    const calculateScore = () => {
        // <p>score: {(timerTotal * playerHealth) / 100}</p>
        // setScore((timerTotal / playerHealth))
        setScore((timerTotal / playerStats.health))
    }
    // calculateScore()

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

                // calculateScore()
                

                const playerAction = async () => {

                    if (props.input == enemy.currentMove) {

                        // toggles a change in state data which is passed as a prop in environment, triggering a useEffect which then applies damage to that environment's enemy object
                        setTriggerDamageToEnemy(!triggerDamageToEnemy) // state, not a function

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
                // if enemy 2 alive, 's' enters tower
                // if enemy 3 alive, 's' enters overworld
            }






        }
    }, [props.keyTrigger])

    const enemyAttack = async () => {
        let x = new Date().getTime()
        setTimerInitial(x)

        await delay(100)

        console.log('enemy attacks!')
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
                {/* <button className={`${styles.keyMapGridItem} ${(props.input == 'rewind') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>rewind</label>
                </button> */}
                <button className={`${styles.keyMapGridItem} ${(props.input == 'left') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>left</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'center') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>center</label>
                </button>
                <button className={`${styles.keyMapGridItem} ${(props.input == 'right') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>right</label>
                </button>
                {/* <button className={`${styles.keyMapGridItem} ${(props.input == 'fastForward') && `${styles.keyMapGridItemSelected}`}`}>
                    <label>fast forward</label>
                </button> */}
                <button className={`${styles.keyMapGridItem} ${styles.menu} ${(gamePaused) && `${styles.keyMapGridItemSelected}`}`}>
                    <label>menu</label>
                </button>
            </section>

            
            <h1>{ gamePaused ? <PauseMenu /> : ""}</h1>
            {/* <h1>{ gamePaused ? 'PAUSED' : ""}</h1> */}
        
        <p>playerHealth: {playerStats.health}</p>
        <p>enemyHealthPoints: {enemy.hp}</p>
        <p>enemyCurrentMove: {enemy.currentMove}</p>
        <p>gameState: {gameState}</p>
        <p>timerTotal: {timerTotal}ms</p>
        <p>Forest Enemy: {environmentProgress.environmentOneComplete ? "Dead" : "Alive"}</p>
        <p>Tower Enemy: {environmentProgress.environmentTwoComplete ? "Dead" : "Alive"}</p>
        <p>Dream Enemy: {environmentProgress.environmentThreeComplete ? "Dead" : "Alive"}</p>
        {/* <p>environmentProgress: {environmentProgress.environmentOneComplete}</p> */}


        {/* CALCULATE SCORE FORMULA:  */}
        
        <p>{score}</p>



        <p>{isInCombat ? 'isInCombat: true' : 'isInCombat: false'}</p>
        
        {/* <Timer /> */}

        

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





