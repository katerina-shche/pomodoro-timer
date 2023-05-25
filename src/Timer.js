import React from 'react'
import { useState, useEffect } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, minutes}) {
    const [isRunning, setIsRunning] = useState(false)
    

    useEffect(() => {
        let timer = null

        const [seconds, setSeconds] = useState(minutes * 60)
        const [min, setMin] = useState(Math.floor(seconds / 60))
        const [sec, setSec] = useState(seconds % 60)
        const [timeString, setTimeString] = useState(`${min}:${sec < 10 ? '0' + sec : sec}`)

        const now = Date.now();
        const then = now + seconds * 1000

        
         timer = setInterval(() => {
            if(isRunning) {
                setSeconds(seconds-1)
                setMin(Math.floor(seconds / 60))
                setSec(seconds % 60)
                setTimeString(`${min}:${sec < 10 ? '0' + sec : sec}`)
            }
            }, 1000)

        return () => {
            clearInterval(timer)
        }

    }, [isRunning, seconds, min, sec])

    const handleToggle = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setSeconds(minutes * 60)
        setMin(minutes)
        setSec('0')
        setTimeString(`${minutes}:00`)
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
