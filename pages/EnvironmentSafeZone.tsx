import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Main.module.css'

// type Props = {}


export default function EnvironmentSafeZone(props:any) {


  useEffect(() => {
    console.log('entering safe zone...')
    // props.playEnemyDamagedSoundControls.stop()
      props.playEnvironmentSafeZoneSound()
        
        return () => {
          props.playEnvironmentSafeZoneSoundControls.stop()
          
            console.log('leaving safe zone...')
        }
    },[])


  return (

    
    <div>
      <section className={styles.environmentContainerContainer}>

      <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>

          <Image 
              src="https://cdna.artstation.com/p/assets/images/images/027/307/130/large/simeon-donchev-render-01.jpg?1591169204"
              alt=''
              layout="fill"
              objectFit='cover'
              className={styles.environmentPhoto}
          />
          
      </div>
      </section>
    </div>
  )
}

