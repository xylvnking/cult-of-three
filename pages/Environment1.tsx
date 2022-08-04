import React from 'react'
import useSound from 'use-sound';
import Image from 'next/image'

import styles from '../styles/Environment.module.css'





export default function Environment1(props:any) {
    // console.log('render')
    // const [play] = useSound('/drone.wav', {
    //     onload: () => {
    //         console.log('soundLoaded')
    //     },
    //     onend: () => {
    //         console.log('soundDone')
            
    //     }
    //     ,
    //     volume: 0.5,
    //     loop: true,
    //     autoplay: true
    // })
    // play()
    // const audio = new AudioContext()
  return (
    <div>
    <h1 className={styles.environmentLabel}>
        [0] cyberpunk
    </h1>
    {/* <div style={{width:'100%', height: '100px', position: 'relative'}}> */}
    <div className={styles.environmentContainer}>

        <Image 
            src="https://cdnb.artstation.com/p/assets/images/images/012/956/573/large/brandon-gobey-border-wall-sketch-38.jpg?1537363390"
            // src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584"
            alt='photo of a cyberpunk city'
            layout="fill"
            objectFit='cover'

            // style={{width: '200px'}}
        />
    </div>
    {/* <img alt="forest photo" src="https://cdna.artstation.com/p/assets/images/images/047/497/996/large/richard-lay-lumiere-3-smaller.jpg?1647729584" /> */}

</div>
  )
}