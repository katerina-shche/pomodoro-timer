import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, startSeconds}) {
    const [isRunning, setIsRunning] = useState(false)
    const secondsLeft = useRef(startSeconds)
    const displayTimeLeft = (anySeconds) => {
        const minutes = Math.floor(anySeconds / 60);
        const remainderSeconds = anySeconds % 60;
        const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display
      }
    const [timeString, setTimeString] = useState(displayTimeLeft(startSeconds))

    

    useEffect(() => {
        let timer = null

            //fresh start
        const now = Date.now();
        const then = now + secondsLeft.current * 1000
        console.log({ now, then, secondsLeft})

            if(isRunning) {
                timer = setInterval(() => {
                secondsLeft.current = Math.round((then - Date.now()) / 1000)
                setTimeString(displayTimeLeft(secondsLeft.current))
                // check if we should stop it!
                 if(secondsLeft.current === 0) {
                 clearInterval(timer)
                 return
                 }   
            }, 1000)
        }
    
        
        return () => {
            clearInterval(timer)
        }

    
}, [isRunning, startSeconds])

  

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        secondsLeft.current = startSeconds
        setTimeString(displayTimeLeft(startSeconds))
    }

  return (
    <div id='timer'>
        <h2 id='timer-label'>{title}</h2>
        <div id='time-left'>{timeString}</div>
        <button id='start_stop' onClick={handleToggle}>{isRunning ? 'Pause' : 'Start'}</button>
        <button id='reset' onClick={handleReset}>Reset</button>
    </div>
  )
}
