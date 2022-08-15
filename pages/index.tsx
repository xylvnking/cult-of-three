import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import GameInput from './GameInput'

const elderPhotoUrl = "/Images/elder.png"
const brutePhotoUrl = "/Images/brute.png"
const cultistPhotoUrl = "/Images/cultist.png"
const safeZonePhotoUrl = "/Images/safezone.png"
const warzonePhotoUrl = "/Images/warzone.png"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cult Of Three</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GameInput />
    </div>
  )
}

export default Home