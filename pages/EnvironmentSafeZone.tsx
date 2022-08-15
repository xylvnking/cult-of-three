import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Main.module.css'

// type Props = {}


export default function EnvironmentSafeZone(props:any) {


  useEffect(() => {
    // console.log('entering safe zone...')
    // props.playEnemyDamagedSoundControls.stop()
      props.playEnvironmentSafeZoneSound()
        
        return () => {
          props.playEnvironmentSafeZoneSoundControls.stop()
          
            // console.log('leaving safe zone...')
        }
    },[])


  return (

    
    <div>
      <section className={styles.environmentContainerContainer}>

      <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>

          <Image 
              // src="https://cdna.artstation.com/p/assets/images/images/027/307/130/large/simeon-donchev-render-01.jpg?1591169204"
              src="https://mj-gallery.com/f2bea3ee-39bd-4309-85b9-3a8b9d699ec9/grid_0.png"
              // src="https://mj-gallery.com/00fc23e8-e2ea-4a37-8ce9-b13d1de0fca3/grid_0.png"
              // src="https://mj-gallery.com/e339ec2f-2a0b-40d0-b173-d3bef4200e30/grid_0.png"
              // src="https://mj-gallery.com/3d8fc62c-86bb-4db6-aadc-7a2a1d419c1f/grid_0.png"
              // src="https://mj-gallery.com/63c17d5d-c16a-4912-ac2d-0c8efa9066d4/grid_0.png"
              alt=''
              layout="fill"
              objectFit='cover'
              className={styles.environmentPhoto}
              // style={{
              //   // backgroundImage: `url('${cultistPhotoUrl}')`,
              //   backgroundPosition: 'bottom'}}
                
          />
          
      </div>
      </section>
    </div>
  )
}

