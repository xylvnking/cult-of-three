import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Main.module.css'

export default function EnvironmentSafeZone(props:any) {

  useEffect(() => {
      props.playEnvironmentSafeZoneSound()
        return () => {
          props.playEnvironmentSafeZoneSoundControls.stop()
        }
    },[])

  return (
    <div aria-hidden="true">
      <section className={styles.environmentContainerContainer}>
        <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>
            <Image 
                // src="https://mj-gallery.com/f2bea3ee-39bd-4309-85b9-3a8b9d699ec9/grid_0.png"
                src="/images/safezone.png"
                alt='a safe camp site in the forest'
                layout="fill"
                objectFit='cover'
                className={styles.environmentPhoto}
            />
        </div>
      </section>
    </div>
  )
}