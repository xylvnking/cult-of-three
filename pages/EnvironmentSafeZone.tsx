import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Environment.module.css'

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
    <h1 className={styles.environmentLabel}>
        [3] SAFEZONE
    </h1>
    <div className={styles.environmentContainer}>
    <Image 
        // src="https://cdnb.artstation.com/p/assets/images/images/035/006/675/large/aleksandra-alekseeva-love-signature.jpg?1613847121"
        // src="https://cdnb.artstation.com/p/assets/images/images/034/471/807/large/m3roj-shootingstar-ech1.jpg?1612375537"
        // src="https://cdnb.artstation.com/p/assets/images/images/044/718/023/large/ideun-kim-02.jpg?1640929054"
        // src="https://cdna.artstation.com/p/assets/images/images/027/307/130/large/simeon-donchev-render-01.jpg?1591169204"
        // src="https://cdna.artstation.com/p/assets/images/images/048/571/836/large/donglu-yu-cyberpunk-street.jpg?1650389931"
        src="https://cdna.artstation.com/p/assets/images/images/019/822/210/large/steven-wong-stevenwong-solarpunk-final.jpg?1565148539"
        
        alt='photo of a safe space'
        layout="fill"
        objectFit='cover'
    />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}