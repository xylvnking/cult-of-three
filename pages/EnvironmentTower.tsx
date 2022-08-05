import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Environment.module.css'

type Props = {}

export default function EnvironmentTower({}: Props) {

  useEffect(() => {
    console.log('entering tower...')

    return () => {
        console.log('leaving tower...')
    }
  },[])

  return (
    <div>
        <h1 className={styles.environmentLabel}>
            [1] tower : brutes
        </h1>
        <div className={styles.environmentContainer}>
            <Image 
                // src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644"
                // src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"
                src="https://cdna.artstation.com/p/assets/images/images/042/043/192/large/max-schiller-evilemperor-outside-v01-01-v03.jpg?1633500155"
                alt='photo of a forest'
                layout="fill"
                objectFit='cover'
            />
        </div>
        {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

    </div>
  )
}