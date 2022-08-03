import React, { KeyboardEvent, useEffect } from 'react'

import GameState from './gamestate'

type Props = {}



export default function GameInput({}: Props) {



    const [currentKeyPressed, setCurrentKeyPressed] = React.useState([])

    const handleKeyDown = (val) => {
        // setCurrentKeyPressed("")
        setCurrentKeyPressed(current => [...current, val])
        console.log(typeof currentKeyPressed)
        // setCurrentKeyPressed(val)
        
    }

    
    useEffect(() => {
        // document.addEventListener('keydown', (e: KeyboardEvent) => setCurrentKeyPressed(e.key))
        document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e.key))
        console.log('event listener added')
        
    }, [])
  return (
    <div>
        <GameState 
            currentKeyPressed={currentKeyPressed}
        />
    </div>
  )
}

