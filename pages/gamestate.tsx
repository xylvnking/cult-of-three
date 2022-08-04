import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'
import Environment1 from './Environment1'
import Environment2 from './Environment2'
import Environment3 from './Environment3'
import useSound from 'use-sound';
// import drone from './audio/drone.wav'
// import drone from '../public/drone.wav'

type GameStateProps = {
    currentKeyPressed:Array<string>
    children?: React.ReactNode
}

let playerHealthPoints:number = 100
const environments:Array<string> = ['city', 'forest','dreamstate']



const keyMap = {
    // make sure this works if caps lock gets hit on
    left: 'a',
    center: 's',
    right: 'd'
}

export default function Gamestate(props: GameStateProps) {
    
    
    React.useEffect(() => {

        const input:any = props.currentKeyPressed

        
    
        if (input == keyMap.left) {
            console.log('LEFT')
            return
        }
        if (input == keyMap.center) {
            console.log('CENTER')
            return
        }
        if (input == keyMap.right) {
            console.log('RIGHT')
            return
        }
        
    }, [props.currentKeyPressed])


    
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
    // playEnvironmentOneSound()

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
            

            <div className={styles.threeContainer}>
                <section className={`${styles.innerContainer} ${styles.section1}`}>
                    <p>1</p>
                </section>
                <section className={`${styles.innerContainer} ${styles.section2}`}>
                    <p>2</p>
                </section>
                <section className={`${styles.innerContainer} ${styles.section3}`}>
                    <p>3</p>
                </section>
            </div>
            
        {getEnvironmentIndex()}
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





