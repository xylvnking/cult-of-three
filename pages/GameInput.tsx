import React, { KeyboardEvent, useEffect } from 'react'

import GameState from './gamestate'

type Props = {}



const GameInput: React.FC<Props> = ({}: Props) => {



    const [currentKeyPressed, setCurrentKeyPressed] = React.useState<Array<string>>([])

    
    // console.log(currentKeyPressed)

    const handleKeyDown = (val:string) => {
        setCurrentKeyPressed([])
        setCurrentKeyPressed((current: any) => [...current, val])
        
        // setCurrentKeyPressed(val)
        
    }

    
    useEffect(() => {
        // document.addEventListener('keydown', (e: KeyboardEvent) => setCurrentKeyPressed(e.key))
        document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e.key))
        // console.log('event listener added')
        
    }, [])
  return (
    <div>
        <GameState 
            currentKeyPressed={currentKeyPressed}
        />
    </div>
  )
}


export default GameInput