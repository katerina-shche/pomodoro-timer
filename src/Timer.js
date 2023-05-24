import React from 'react'
import { useState, useEffect } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, timeString, minutes}) {

    const [seconds, setSeconds] = useState(minutes * 60)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timer = null

        if(isRunning) {
            timer = setInterval(() => {
                setSeconds(seconds-1)
            }, 1000)
        }

        return () => {
            clearInterval(timer)
        }

    }, [isRunning, seconds])

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setSeconds(minutes * 60)
        setIsRunning(false)
    }

  return (
    <div id='timer'>
        <h2 id='timer-label'>{title}</h2>
        <div id='time-left'>{seconds}</div>
        <button id='start_stop' onClick={handleToggle}>{isRunning ? 'Pause' : 'Start'}</button>
        <button id='reset' onClick={handleReset}>Reset</button>
    </div>
  )
}
