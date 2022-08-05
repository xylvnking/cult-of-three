import React from 'react'

type Props = {}


let x = new Date().getTime()
export default function Timer({}: Props) {

    const [timer, setTimer] = React.useState()

    React.useEffect(() => {
        x = new Date().getTime()
        setTimer(x)
    },[])


  return (
    <div>
        <h1>{timer}</h1>

    </div>
  )
}