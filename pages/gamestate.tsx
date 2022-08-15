import React, { useEffect, useState } from 'react'
import styles from '../styles/Main.module.css'

import EnvironmentCombat from './EnvironmentCombat'
import EnvironmentSafeZone from './EnvironmentSafeZone'
import PauseMenu from './PauseMenu'

import EndScreen from './EndScreen'
import useSound from 'use-sound';
import IntroScreen from './IntroScreen'

const delay = (ms: any) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

const gameStates = ['safezone', 'combat', 'paused']

const defaultPlayerHealth:number = 30

// const brutePhotoUrl = 'https://mj-gallery.com/5c17343d-0603-4010-ae3e-22781ba989ec/grid_0.png'
const brutePhotoUrl = "/images/brute.png"

// const cultistPhotoUrl = 'https://mj-gallery.com/9c40ea5a-078f-4faf-9d11-18e710bd8116/grid_0.png'
const cultistPhotoUrl = "/images/cultist.png"

// const elderPhotoUrl = 'https://mj-gallery.com/a8e5978d-d5ac-4cf6-a6ca-90d5c1ff0dac/grid_0.png'
const elderPhotoUrl = "/images/elder.png"

export default function Gamestate(props:any) {

    const [enemyAttackDelayTime, setEnemyAttackDelayTime] = useState<number>(2000)
    const [timerTotal, setTimerTotal] = useState<number>(0)
    const [timerInitial, setTimerInitial] = useState<number>(0)
    const [timerFinal, setTimerFinal] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [environmentIndex, setEnvironmentIndex] = useState<number>(3)
    const [enemy, setEnemy] = useState({
        hp: 20,
        nameOfAttackingEnemy: ""
    })
    const [gamePaused, setGamePaused] = useState<boolean>(false) // i think gamePaused might be redundant now but ill remove it later 
    const [gameState, setGameState] = useState<string>(gameStates[0])
    const [isInCombat, setIsInCombat] = useState<boolean>(false)
    const [gameComplete, setGameComplete] = useState<boolean>(false)
    const [triggerDamageToEnemy, setTriggerDamageToEnemy] = useState<boolean>(true)
    const [triggerDamageToPlayer, setTriggerDamageToPlayer] = useState<boolean>(true)
    const [playerStats, setPlayerStats] = useState({
        health: defaultPlayerHealth,
        attackDamage: 1
    })
    const [playerDied, setPlayerDied] = useState<boolean>(false)
    const [scuffedGameStartCounter, setScuffedGameStartCounter] = useState<number>(0)
    const soundMuted = false
    const [playEndingMusic, playEndingMusicControls] = useSound('/Vinyl.wav', {
        volume: 3,
        loop: true,
        mute: soundMuted
    })
    const [playCombatEnvironmentSound, playCombatEnvironmentSoundControls] = useSound('/CombatBackground.mp3', {
        volume: .6,
        loop: true,
        mute: soundMuted
    })
    const [playEnvironmentSafeZoneSound, playEnvironmentSafeZoneSoundControls] = useSound('/music.mp3', {
        volume: .6,
        loop: true,
        playbackRate: 1,
        mute: soundMuted
    })
    const [playEnemyAttackOneSound, playAttackOneSoundControls] = useSound('/cultistAttackLeft.mp3', {
        volume: 1,
        loop: true,
        mute: soundMuted
    })
    const [playAttackTwoSound, playAttackTwoSoundControls] = useSound('/BruteAttack.mp3', {
        volume: 1,
        loop: true,
        mute: soundMuted
    })
    const [playAttackThreeSound, playAttackThreeSoundControls] = useSound('/elderAttackRight.mp3', {
        volume: 1,
        loop: true,
        mute: soundMuted
    })
    const [playPlayerAttackOneSound, playPlayerAttackOneSoundControls] = useSound('/opLeft25.mp3', {
        volume: 1.2,
        loop: false,
        mute: soundMuted,
        
    })
        const [playPlayerAttackTwoSound, playPlayerAttackTwoSoundControls] = useSound('/opCenter.mp3', {
        volume: .8,
        loop: false,
        mute: soundMuted
    })
    const [playPlayerAttackThreeSound, playPlayerAttackThreeSoundControls] = useSound('/opRight25.mp3', {
        
        volume: 1.2,
        loop: false,
        mute: soundMuted
    })
    const [playPlayerDamagedSound, playPlayerDamagedSoundControls] = useSound('/headshotSound.mp3', {
        volume: .7,
        loop: false,
        mute: soundMuted
    })
    const [playTransitionSound, playTransitionSoundControls] = useSound('/woosh.mp3', {
        volume: .5,
        loop: false,
        mute: soundMuted
    })

    function playEnemyAttackSound() {
        if (playerDied == false) {
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
    } 

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
        playTransitionSound()
    }, [environmentIndex])

    const environment:Function = () => {
        if (environmentIndex < 3) {
            return <EnvironmentCombat 
                        gameStates={gameStates}
                        setGameState={setGameState}
                        setIsInCombat={setIsInCombat}
                        playCombatEnvironmentSound={playCombatEnvironmentSound}
                        playCombatEnvironmentSoundControls={playCombatEnvironmentSoundControls}
                        enemyAttack={enemyAttack}
                        triggerDamageToEnemy={triggerDamageToEnemy}
                        triggerDamageToPlayer={triggerDamageToPlayer}
                        damagePlayer={damagePlayer}
                        playerStats={playerStats}
                        calculateScore={calculateScore}
                        calculateCurrentPlayerHealth={calculateCurrentPlayerHealth}
                        setGameComplete={setGameComplete}
                        playEndingMusic={playEndingMusic}
                        playEnvironmentSafeZoneSoundControls={playEnvironmentSafeZoneSoundControls}
                    />
        } else {
            return <EnvironmentSafeZone 
                        playEnvironmentSafeZoneSoundControls={playEnvironmentSafeZoneSoundControls}
                        playEnvironmentSafeZoneSound={playEnvironmentSafeZoneSound}
                        
                    />
        }

    }

    const resetEverything:Function = () => {
        
        setEnemy((current:any) => {
            return {
                ...current,
                nameOfAttackingEnemy: " "
            }
        })
        setPlayerStats((current:any) => {
            return {
                ...current,
                health: defaultPlayerHealth,
            }
        })
        
        if (gameComplete) {
            setScore(0)
            setTimerTotal(0)
            setTimerInitial(0)
            setTimerFinal(0)
            playEndingMusicControls.stop()
            setGameComplete(false)
        }

        setIsInCombat(false)
        setEnvironmentIndex(3)
        setGameState(gameStates[0])
        setPlayerDied(false)
        playAttackOneSoundControls.stop()
        playAttackTwoSoundControls.stop()
        playAttackThreeSoundControls.stop()
        
    }

    useEffect(() => {
        setGameState('safezone')
        playCombatEnvironmentSoundControls.stop()
    }, [gameComplete])

    const calculateCurrentPlayerHealth:Function = (enemyAttackDamage:number) => {
        return playerStats.health - enemyAttackDamage
    }

    const damagePlayer:Function = (enemyAttackDamage:number) => {
        playPlayerDamagedSound()
        calculateCurrentPlayerHealth(enemyAttackDamage)
        setPlayerStats((current:any) => {
            return {
                ...current,
                health: calculateCurrentPlayerHealth(enemyAttackDamage),
            }
        })

        if (calculateCurrentPlayerHealth(enemyAttackDamage) <= 0) {
              setScore(0)
              setGameComplete(true)
              setPlayerDied(true)
        }

    }

    const calculateScore:Function = () => {
        setScore((timerTotal / playerStats.health))
    }

    function increaseScuffedGameStartCounter() {
        setScuffedGameStartCounter((current:any) => {
            return current + 1     
        })

        if (scuffedGameStartCounter >= 2) {
            // playEnvironmentSafeZoneSoundControls.stop()
        }
    }

    // this useEffect filters out the players input according to the current state of the game
    useEffect(() => {
        if (props.input && scuffedGameStartCounter > 1 ) {
            increaseScuffedGameStartCounter() // makes sure that input won't count as gameplay input unless the game has started
            
            // PAUSED
            if (props.input == 'menu' && scuffedGameStartCounter >= 2 && !gameComplete) {
                setGamePaused(!gamePaused)
                if (!gamePaused) { // if the game is not paused, set the game state to paused
                    setGameState(gameStates[2])
                } else if (gamePaused && isInCombat) { // if the game is paused and we are in combat, set the game state back to combat
                    setGameState(gameStates[1])
                } else if (gamePaused && !isInCombat) { // if the game is paused and we are not in combat, set the game state back to safezone
                    setGameState(gameStates[0])
                }
            } 

            // COMBAT
            else if (!gamePaused && (gameState == 'combat') && scuffedGameStartCounter >= 2) { // i think gamepaused might be redundant now but ill remove it later
                stopAttackSound()
                
                let x = new Date().getTime()
                setTimerFinal(x)
                let y = x - timerInitial
                setTimerTotal(timerTotal + y)

                const playerAction:Function = async () => {
                    if (props.input == enemy.nameOfAttackingEnemy) {
                        playPlayerAttackSound()
                        // toggles a change in state data which is passed as a prop to the combatEnvironment component, triggering a useEffect which then applies damage to the enemy
                        setTriggerDamageToEnemy(!triggerDamageToEnemy)
                    } else {
                        // toggles a change in state data which is passed as a prop to the combatEnvironment component, 
                        // triggering a useEffect which then loops back into this component by calling a prop function 
                        // which takes the enemys attack damage as an argument
                        setTriggerDamageToPlayer(!triggerDamageToPlayer)
                    }
                    setEnemy((current:any) => {
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
                if (!gameComplete) {
                    setEnvironmentIndex(0)
                    props.setInput("") // clears the input state to make sure the environment's controls aren't highlighted
                } else if (gameComplete) {
                    props.setInput("")
                    resetEverything()
                }
            }
        }
    }, [props.keyTrigger])

    useEffect(() => {
        playEnemyAttackSound()
    },[enemy.nameOfAttackingEnemy])

    const enemyAttack:Function = async () => {

        let x:number = new Date().getTime()
        setTimerInitial(x)
        await delay(enemyAttackDelayTime)
        
        playPlayerAttackOneSoundControls.stop()
        playPlayerAttackTwoSoundControls.stop()
        playPlayerAttackThreeSoundControls.stop()

        const enemyMoveNumber:number = getRandomInt(3)

        const enemyAttacksLeft:Function = () => {
            setEnemy((current:any) => {
                return {
                    ...current,
                    nameOfAttackingEnemy: 'left'
                }
            })
        }
        const enemyAttacksCenter:Function = () => {
            setEnemy((current:any) => {
                return {
                    ...current,
                    nameOfAttackingEnemy: 'center'
                }
            })
        }
        const enemyAttacksRight:Function = () => {
            setEnemy((current:any) => {
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
            <section className={styles.keyMapGridContainer} aria-hidden="true">
                <div
                    className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'left' && playerDied == false) && `${styles.keyMapSelected}`}`}
                    style={{
                        backgroundImage: `url('${cultistPhotoUrl}')`,
                        backgroundPosition: 'top'}}
                    >
                    <p className={`${styles.keyMap} `}>
                        {props.keyMap ? props.keyMap.left : ""}
                    </p>
                </div>
                <div
                    className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'center' && playerDied == false) && `${styles.keyMapSelected}`}`}
                    style={{
                        backgroundImage: `url('${brutePhotoUrl}')`,
                        backgroundPosition: 'top'}}
                    >
                    <p className={`${styles.keyMap} `}>
                        {props.keyMap ? props.keyMap.center : ""}
                    </p>
                </div>
                <div
                    className={`${styles.enemyIcon} ${styles.gridBorder} ${(enemy.nameOfAttackingEnemy == 'right' && playerDied == false) && `${styles.keyMapSelected}`}`}
                    style={{
                        backgroundImage: `url('${elderPhotoUrl}')`,}}
                    >
                    <p className={`${styles.keyMap} `}>
                        {props.keyMap ? props.keyMap.right : ""}
                    </p>
                </div>
            </section>

            {environment()}

            { 
            gamePaused 
            ? 
            <PauseMenu /> 
            : 
            ""
            }
        
            { 
            gameComplete 
            ? 
            <EndScreen 
                score={score}
                keyMap={props.keyMap}
                playerDied={playerDied}
            /> 
            : 
            ""
            }
            
            { 
            scuffedGameStartCounter < 1 
            ? 
            <IntroScreen 
            increaseScuffedGameStartCounter={increaseScuffedGameStartCounter}
            playEnvironmentSafeZoneSound={playEnvironmentSafeZoneSound}
            /> 
            : 
            ""
            }

        </main>
  )
}