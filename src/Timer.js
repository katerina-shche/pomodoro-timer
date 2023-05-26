import React, { useState, useEffect, useRef } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, minutes }) {
    const [isRunning, setIsRunning] = useState(false)
    const secondsLeft = useRef(minutes * 60)
    const displayTimeLeft = (anySeconds) => {
        const minutes = Math.floor(anySeconds / 60);
        const remainderSeconds = anySeconds % 60;
        const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display
      }
    const [timeString, setTimeString] = useState(displayTimeLeft(minutes * 60))

    

    useEffect(() => {
        let timer = null
        const now = Date.now();
        const then = now + secondsLeft.current * 1000

            if(isRunning) {
                timer = setInterval(() => {
                // check if we should stop it!
                 if (secondsLeft.current <= 0) {
                    clearInterval(timer)
                    setIsRunning(false)
                    const audio = document.querySelector('audio')
                    console.log(audio)
                    audio.currentTime = 0; // rewind to the start
                    audio.play();
                    return
                    } 
                secondsLeft.current = Math.round((then - Date.now()) / 1000)
                setTimeString(displayTimeLeft(secondsLeft.current))  
            }, 1000)
            }

        return () => {
            clearInterval(timer)
        }
}, [isRunning, minutes])

  

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        secondsLeft.current = minutes * 60
        setTimeString(displayTimeLeft(minutes * 60))
        const audio = document.querySelector('audio')
        audio.pause()
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
