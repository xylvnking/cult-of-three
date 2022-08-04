import React from 'react'
import Image from 'next/image'
import styles from '../styles/Environment.module.css'

type Props = {}

export default function Environment3({}: Props) {
  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [2] dreamstate : elders
    </h1>
    <div className={styles.environmentContainer}>
    <Image 
        // src="https://cdnb.artstation.com/p/assets/images/images/035/006/675/large/aleksandra-alekseeva-love-signature.jpg?1613847121"
        // src="https://cdnb.artstation.com/p/assets/images/images/034/471/807/large/m3roj-shootingstar-ech1.jpg?1612375537"
        src="https://cdnb.artstation.com/p/assets/images/images/033/313/719/large/huleeb-367-28-dec-2020-final-c.jpg?1609171255"
        alt='photo of a dream like world'
        layout="fill"
        objectFit='cover'
    />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}