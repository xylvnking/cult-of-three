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
    children?: React.ReactNode
}

let playerHealthPoints:number = 100
const environments:Array<string> = ['city', 'forest','dreamstate']

export default function Gamestate(props: GameStateProps) {
    
    const [environmentIndex, setEnvironmentIndex] = React.useState<number>(0)


    const getEnvironmentIndex = () => {
        // console.log(environmentIndex)
        switch (environmentIndex) {
            case 0:
                return <Environment1 />
                // return <p>yeah</p>
                console.log('Environment1')
                break;
            case 1:
                return <Environment2 />
                console.log('Environment2')
                break;
            case 2:
                return <Environment3 />
                console.log('Environment3')
                break;
        }
    }
    
    const [playEnvironmentOneSound, playEnvironmentOneSoundControls] = useSound('/drone.wav', {
        volume: 0.5,
        loop: true,
        // playbackRate: 2
    })
    const [playEnvironmentTwoSound, playEnvironmentTwoSoundControls] = useSound('/drone.wav', {
        volume: 0.5,
        loop: true,
        playbackRate: 2
    })
    const [playEnvironmentThreeSound, playEnvironmentThreeSoundControls] = useSound('/drone.wav', {
        volume: 0.5,
        loop: true,
        playbackRate: 4
    })

    const handleEnvironmentSound = () => {
        if (environmentIndex == 0) {
            console.log('environment1soundshouldwork')
            playEnvironmentOneSound()
            playEnvironmentTwoSoundControls.stop()
            playEnvironmentThreeSoundControls.stop()
        }
        else if (environmentIndex == 1) {
            playEnvironmentTwoSound()
            playEnvironmentOneSoundControls.stop()
            playEnvironmentThreeSoundControls.stop()
        }
        else if (environmentIndex == 2) {
            playEnvironmentThreeSound()
            playEnvironmentOneSoundControls.stop()
            playEnvironmentTwoSoundControls.stop()
        }
    }



    return (
        <main className={styles.mainContainer}>
            {getEnvironmentIndex()}

            {/* {(props.input == 'leftListen') && <p>yeah</p>} */}

            <div className={styles.threeContainer}>
                {/* <section className={`${styles.innerContainer} ${styles.section1}`}> */}
                <button className={`${styles.innerContainer} ${(props.input == 'leftListen') && `${styles.innerContainerSelect}`}`}>
                    <label>leftListen</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'centerListen') && `${styles.innerContainerSelect}`}`}>
                    <label>centerListen</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'rightListen') && `${styles.innerContainerSelect}`}`}>
                    <label>rightListen</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'rewind') && `${styles.innerContainerSelect}`}`}>
                    <label>rewind</label>
                </button>

                <button className={`${styles.innerContainer} ${(props.input == 'left') && `${styles.innerContainerSelect}`}`}>
                    <label>left</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'center') && `${styles.innerContainerSelect}`}`}>
                    <label>center</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'right') && `${styles.innerContainerSelect}`}`}>
                    <label>right</label>
                </button>
                <button className={`${styles.innerContainer} ${(props.input == 'fastForward') && `${styles.innerContainerSelect}`}`}>
                    <label>fast forward</label>
                </button>

                <button className={`${styles.innerContainer} ${styles.menu} ${(props.input == 'menu') && `${styles.innerContainerSelect}`}`}>
                    <label>menu</label>
                </button>
            </div>
            
        
        <p>playerHealthPoints: {playerHealthPoints}</p>
        {/* <p>environmentIndex: {environmentIndex} | environments[environmentIndex]: {environments[environmentIndex]}</p> */}
        {/* <button onClick={play}>Boop!</button>; */}

        {/* <p>{Props.currentKeyPressed}</p> */}


        <button
        onClick={() => handleEnvironmentSound()}
        >
            check environment
        </button>

        <button
            onClick={() => setEnvironmentIndex(0)}
        >
            0
        </button>
        <button
            onClick={() => setEnvironmentIndex(1)}
        >
            1
        </button>
        <button
            onClick={() => setEnvironmentIndex(2)}
        >
            2
        </button>
        
        
        
        </main>
  )
}





