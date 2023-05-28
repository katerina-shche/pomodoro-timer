import React, { useState, useEffect, useRef } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, minutes, onReset, onTimeEnd }) {
    const prevMinutes = useRef(minutes)
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
        // comparing if prevMinutes and current minutes are different and stop and update the timer
        if (prevMinutes.current !== minutes) {
            secondsLeft.current = minutes * 60
            setTimeString(displayTimeLeft(secondsLeft.current))
            setIsRunning(false)
            prevMinutes.current = minutes
        }
        // if no new minutes then everething else goes as usual
        let timer = null
        const now = Date.now();
        const then = now + secondsLeft.current * 1000

            if(isRunning) {
                timer = setInterval(() => {
                // check if we should stop it!
                 if (secondsLeft.current <= 0) {
                    onTimeEnd()
                    secondsLeft.current = minutes * 60
                    setTimeString(displayTimeLeft(secondsLeft.current))
                    setIsRunning(true)
                    const audio = document.querySelector('audio')
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
}, [isRunning, minutes, onTimeEnd])

  

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        //uppdating min to 5 and 25 in App.js
        onReset()
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
