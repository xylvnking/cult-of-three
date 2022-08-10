import React, { KeyboardEvent, useEffect } from 'react'

import GameState from './gamestate'


type Props = {}

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


const GameInput: React.FC<Props> = ({}: Props) => {



    const [currentKeyPressed, setCurrentKeyPressed] = React.useState<Array<string>>([])
    const [input, setInput] = React.useState<string>("")

    // key trigger is used within gameState to trigger the input check 
    // because otherwise when it was using input, the useEffect 
    // wouldn't retrigger if the same input was required 
    // twice in a row since the value hadn't actually changed
    const [keyTrigger, setKeyTrigger] = React.useState(false)
    
    // console.log(currentKeyPressed)

    const handleKeyDown = async (val:string) => {
        setCurrentKeyPressed([])
        setCurrentKeyPressed((current: any) => [...current, val])
        
        
        // console.log('yer')
        
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
        if (input == keyMap.leftListen) {
            setInput('leftListen')
            return
        }
        if (input == keyMap.centerListen) {
            setInput('centerListen')
            return
        }
        if (input == keyMap.rightListen) {
            setInput('rightListen')
            return
        }
        if (input == keyMap.menu) {
            setInput('menu')
            return
        }
        // if (input == keyMap.fastForward) {
        //     setInput('fastForward')
        //     return
        // }
        // if (input == keyMap.rewind) {
        //     setInput('rewind')
        //     return
        // } 
        else { // 'disables' all keys which aren't mapped to control
            setInput("")
            return
        }
        
    }, [currentKeyPressed])

    
    useEffect(() => {
        // document.addEventListener('keydown', (e: KeyboardEvent) => setCurrentKeyPressed(e.key))
        document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e.key))
        // console.log('event listener added')
        
    }, [])


    // console.log(typeof setInput)
  return (
    <div>
        <main>

            <GameState 
                // currentKeyPressed={currentKeyPressed}
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