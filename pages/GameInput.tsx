import React, { KeyboardEvent, useEffect } from 'react'

import GameState from './gamestate'

type Props = {}



const GameInput: React.FC<Props> = ({}: Props) => {



    const [currentKeyPressed, setCurrentKeyPressed] = React.useState<Array<string>>([])
    const [input, setInput] = React.useState<string>("")

    
    // console.log(currentKeyPressed)

    const handleKeyDown = (val:string) => {
        setCurrentKeyPressed([])
        setCurrentKeyPressed((current: any) => [...current, val])
        
        // setCurrentKeyPressed(val)
        
    }

    const keyMap = {
        // make sure this works if caps lock gets hit on
        left: 'a',
        center: 's',
        right: 'd',
        leftListen: 'q',
        centerListen: 'w',
        rightListen: 'e',
        menu: ' ',
        fastForward: 'f',
        rewind: 'r'

    }

    React.useEffect(() => {

        const input:any = currentKeyPressed
    
        if (input == keyMap.left) {
            console.log('left')
            setInput('left')
            return
        }
        if (input == keyMap.center) {
            console.log('center')
            setInput('center')
            return
        }
        if (input == keyMap.right) {
            console.log('right')
            setInput('right')
            return
        }
        if (input == keyMap.leftListen) {
            console.log('leftListen')
            setInput('leftListen')
            return
        }
        if (input == keyMap.centerListen) {
            console.log('centerListen')
            setInput('centerListen')
            return
        }
        if (input == keyMap.rightListen) {
            console.log('rightListen')
            setInput('rightListen')
            return
        }
        if (input == keyMap.menu) {
            console.log('menu')
            setInput('menu')
            return
        }
        if (input == keyMap.fastForward) {
            console.log('fastForward')
            setInput('fastForward')
            return
        }
        if (input == keyMap.rewind) {
            console.log('rewind')
            setInput('rewind')
            return
        }
        
    }, [currentKeyPressed])

    
    useEffect(() => {
        // document.addEventListener('keydown', (e: KeyboardEvent) => setCurrentKeyPressed(e.key))
        document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e.key))
        // console.log('event listener added')
        
    }, [])
  return (
    <div>
        <GameState 
            // currentKeyPressed={currentKeyPressed}
            input={input}
        />
    </div>
  )
}


export default GameInput