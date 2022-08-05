import React, { useEffect } from 'react'
import useSound from 'use-sound';
import Image from 'next/image'

import styles from '../styles/Environment.module.css'





export default function Environment1(props:any) {

    useEffect(() => {
      console.log('entering forest...')

      return () => {
          console.log('leaving forest...')
      }
  },[])

  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] forest : cultists
    </h1>
    {/* <div style={{width:'100%', height: '100px', position: 'relative'}}> */}
    <div className={styles.environmentContainer}>

        <Image 
            src="https://cdnb.artstation.com/p/assets/images/images/029/291/257/large/aaron-limonick-finding-zebra-clearing-post.jpg?1597078644"
            // src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"

            alt='photo of a forest'
            layout="fill"
            objectFit='cover'

            // style={{width: '200px'}}
        />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}