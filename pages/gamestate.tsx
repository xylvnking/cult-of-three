import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'
import Environment1 from './Environment1'
import Environment2 from './Environment2'
import Environment3 from './Environment3'

type GameStateProps = {
    currentKeyPressed:Array<string>
    children?: React.ReactNode
}

let playerHealthPoints:number = 100
const environments:Array<string> = ['city', 'forest','dreamstate']



export default function Gamestate(props: GameStateProps) {
    
    // console.log(`${props.currentKeyPressed}`)
    


    
    const [environmentIndex, setEnvironmentIndex] = React.useState<number>(0)

    const getEnvironmentIndex = () => {
        console.log(environmentIndex)
        switch (environmentIndex) {
            case 0:
                return <Environment1 />
                // return <p>yeah</p>
                console.log('Environment1')
                break;
            case 1:
                return <Environment2 />
                // console.log('Environment2')
                break;
            case 2:
                return <Environment3 />
                // console.log('Environment3')
                break;
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
            
        <p>playerHealthPoints: {playerHealthPoints}</p>
        <p>environmentIndex: {environmentIndex} | environments[environmentIndex]: {environments[environmentIndex]}</p>
        {/* <p>{Props.currentKeyPressed}</p> */}

        {
            getEnvironmentIndex()
        }

      </main>
  )
}





