import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'
import Environment1 from './Environment1'
import Environment2 from './Environment2'
import Environment3 from './Environment3'
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


export default function Gamestate(props: GameStateProps) {
    
    const [environmentIndex, setEnvironmentIndex] = React.useState<number>(0)
    const [enemyState, setEnemyState] = React.useState()

    const [playerHealth, setPlayerHealth] = React.useState(100)

    

    const [enemy, setEnemy] = React.useState({
        hp: 100,
        moveSet: ['attack', 'charge', 'buff'],
        currentMove: ""
    })

    const [environmentOneSoundIsPlaying, setEnvironmentOneSoundIsPlaying] = React.useState(false)
    const [environmentTwoSoundIsPlaying, setEnvironmentTwoSoundIsPlaying] = React.useState(false)
    const [environmentThreeSoundIsPlaying, setEnvironmentThreeSoundIsPlaying] = React.useState(false)

    const [gamePaused, setGamePaused] = React.useState(false)

    const openPauseMenu = () => {
        console.log('GAME IS PAUSED')
    }

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

    const getEnvironmentIndex = () => {
        handleEnvironmentSound()
        switch (environmentIndex) {
            case 0:
                return <Environment1 />
            case 1:
                return <Environment2 />
            case 2:
                return <Environment3 />
        }
    }

    const resetEverything = () => {
        // reset everything
        setEnemy(current => {
            return {
                ...current,
                hp: 100,
                currentMove: ""
            }
        })

        setPlayerHealth(100)
    }

    const playerDeath = () => {
        console.log('YOU HAVE DIED')

        resetEverything()
        
    }


    useEffect(() => {


        // console.log(enemy.currentMove)
        // console.log(props.input)
        console.log('player attack called')

        if (props.input) {

            // checking if game paused
            if (props.input == 'menu') {
                setGamePaused(!gamePaused)
                openPauseMenu()
                
            } else if (!gamePaused) {
                const playerAction = async () => {
                    if (props.input == enemy.currentMove) {
                        // setEnemy()
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
                        console.log('You have won!')
                        // put enemy death function here if you need it
                        resetEverything()
                    } else {
    
                        await delay(100)
        
                        enemyAttack()
                    }
                }
                playerAction()
            }

            
        }
        
    // }, [props.input])
    }, [props.keyTrigger])

    if (enemy.hp == 0) {
        console.log('you win!')
        // return
    }

    const enemyAttack = async () => {
        // check enemy hp
            // if 0, win
        

        const enemyMoveNumber = getRandomInt(3)
        // console.log(enemyMoveNumber)


        const enemyAttacksLeft = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'left'
                }
            })
            // console.log('enemy attacks left!')
        }
        const enemyAttacksCenter = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'center'
                }
            })
            // console.log('enemy attacks center!')
        }
        const enemyAttacksRight = () => {
            setEnemy(current => {
                return {
                    ...current,
                    currentMove: 'right'
                }
            })
            // console.log('enemy attacks right!')
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

            {getEnvironmentIndex()}

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

        <h1>{ gamePaused ? 'PAUSED' : ""}</h1>
        {/* <p>Game is paused: {gamePaused}</p> */}
        



        <br />
        debug:
        <br />
        <button
            onClick={() => setEnvironmentIndex(0)}
        >
            set environment: 0
        </button>
        <button
            onClick={() => setEnvironmentIndex(1)}
        >
            set environment: 1
        </button>
        <button
            onClick={() => setEnvironmentIndex(2)}
        >
            set environment: 2
        </button>

        <br />
        
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
        
        
        </main>
  )
}





