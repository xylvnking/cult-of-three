import React, { useEffect, useRef } from 'react'
import styles from '../styles/Main.module.css'

type GameStateProps = {
    currentKeyPressed:string

}

let playerHealthPoints:number = 100



export default function Gamestate(props: GameStateProps) {
    
    

    console.log(`${props.currentKeyPressed}`)
    
    // console.log(props.currentKeyPressed)
    const [environment, setEnvironment] = React.useState()
    

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

            {/* <div>
				<p> Are You Smart?</p>
					<input 
                        type="hidden" 
                        // value={answer} 
                        onKeyPress={(e) => handleAnswerChange(e.target.value)}
                    />
				<small> Press Y for Yes or N for No</small>
            </div> */}
            
        <p>playerHealthPoints: {playerHealthPoints}</p>
        {/* <p>{Props.currentKeyPressed}</p> */}

      </main>
  )
}





