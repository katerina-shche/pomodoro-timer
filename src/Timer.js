import React from 'react'
import { useState, useEffect } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, seconds}) {
    const [isRunning, setIsRunning] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(seconds)
    const [timeString, setTimeString] = useState("")

    useEffect(() => {
        let timer = null

        const now = Date.now();
        const then = now + seconds * 1000
        
        function displayTimeLeft(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainderSeconds = seconds % 60;
            const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
            setTimeString(display)
            document.title = display;
          }

        displayTimeLeft(secondsLeft)
        
        timer = setInterval(() => {
            if(isRunning) {
                setSecondsLeft(Math.round((then - Date.now()) / 1000))
                displayTimeLeft(secondsLeft)
                // check if we should stop it!
                 if(secondsLeft < 0) {
                 clearInterval(timer);
                 return;
                 }   
            }
            }, 1000)

        return () => {
            clearInterval(timer)
        }

    }, [isRunning, seconds])

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setSecondsLeft(seconds)
        // displayTimeLeft(secondsLeft)
        setIsRunning(false)
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
