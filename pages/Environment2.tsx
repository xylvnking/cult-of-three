import React from 'react'
import Image from 'next/image'
import styles from '../styles/Environment.module.css'

type Props = {}

export default function Environment2({}: Props) {
  return (
    <div>
        <h1 className={styles.environmentLabel}>
            [1] forest
        </h1>
        <div className={styles.environmentContainer}>
            <Image 
                src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644"
                alt='photo of a forest'
                layout="fill"
                objectFit='cover'
            />
        </div>
        {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

    </div>
  )
}