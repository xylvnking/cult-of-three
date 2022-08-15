import React, { useEffect, useState } from 'react'
import GameState from './gamestate'

type Props = {}

const GameInput: React.FC<Props> = (props:any) => {

    const [currentKeyPressed, setCurrentKeyPressed] = useState<Array<string>>([])
    const [input, setInput] = useState<string>("")
    const [keyTrigger, setKeyTrigger] = useState<boolean>(false)
    // keyTrigger is used within gameState to trigger the input check 
    // because otherwise when it was using input, the useEffect 
    // wouldn't retrigger if the same input was required 
    // twice in a row since the value hadn't actually changed
    
    const handleKeyDown = async (val:string) => {
            setCurrentKeyPressed([])
            setCurrentKeyPressed((current: any) => [...current, val])
    }

    const keyMap = {
        left: 'a',
        center: 's',
        right: 'd',
        menu: ' ',
    }

    useEffect(() => {
        setKeyTrigger(!keyTrigger)
        const input:any = currentKeyPressed
    
        if (input == keyMap.left) {
            setInput('left')
            return
        }
        if (input == keyMap.center) {
            setInput('center')
            return
        }
        if (input == keyMap.right) {
            setInput('right')
            return
        }
        if (input == keyMap.menu) {
            setInput('menu')
            return
        }
        else { // 'disables' all keys which aren't mapped to control
            setInput("")
            return
        }
    }, [currentKeyPressed])

    
    useEffect(() => { // gets user input
        document.addEventListener('keydown', (e) => handleKeyDown(e.key))
    }, [])
    
  return (
    <div>
        <main>
            <GameState 
                input={input}
                setInput={setInput}
                keyTrigger={keyTrigger}
                keyMap={keyMap}
            />
        </main>
    </div>
  )
}

export default GameInput