import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Main.module.css'

type Props = {}

export default function EnvironmentSafeZone({}: Props) {


    useEffect(() => {
        console.log('entering safe zone...')

        return () => {
            console.log('leaving safe zone...')
        }
    },[])


  return (

    
    <div>
      <section className={styles.environmentContainerContainer}>

      <div className={`${styles.environmentContainer} ${styles.gridBorder}`}>

          <Image 
              src="https://cdna.artstation.com/p/assets/images/images/019/822/210/large/steven-wong-stevenwong-solarpunk-final.jpg?1565148539"
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

