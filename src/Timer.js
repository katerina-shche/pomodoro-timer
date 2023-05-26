import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
//styles
import './Timer.css'

export default function Timer({ title, startSeconds}) {
    const [isRunning, setIsRunning] = useState(false)
    const [isBeginning, setIsBeginning] = useState(true)
    const secondsLeft = useRef(null)
    const displayTimeLeft = (anySeconds) => {
        const minutes = Math.floor(anySeconds / 60);
        const remainderSeconds = anySeconds % 60;
        const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display
      }
    const [timeString, setTimeString] = useState(displayTimeLeft(startSeconds))

    

    useEffect(() => {
        let timer = null

        if(isBeginning) {
            //fresh start
        const now = Date.now();
        const then = now + startSeconds * 1000
        console.log({isBeginning, now, then, secondsLeft})

            if(isRunning) {
                timer = setInterval(() => {
                secondsLeft.current = Math.round((then - Date.now()) / 1000)
                setTimeString(displayTimeLeft(secondsLeft.current))
                // check if we should stop it!
                 if(secondsLeft.current < 0) {
                 clearInterval(timer)
                 return
                 }   
            }, 1000)
        }
    }
        if(!isBeginning) {
            //start after pause
            console.log(secondsLeft.current)
            const now = Date.now();
            const then = now + secondsLeft.current * 1000
            if(isRunning) {
                timer = setInterval(() => {
                secondsLeft.current = Math.round((then - Date.now()) / 1000)
                setTimeString(displayTimeLeft(secondsLeft.current))
                // check if we should stop it!
                 if(secondsLeft.current < 0) {
                 clearInterval(timer)
                 return
                 }   
            }, 1000)
        }
        }
        return () => {
            clearInterval(timer)
        }

    
}, [isRunning, isBeginning, startSeconds])

  

    const handleToggle = () => {
        if(!isRunning && isBeginning) {
            setIsRunning(true)
        } else 
        if(isRunning && isBeginning) {
            setIsRunning(false)
            setIsBeginning(false)
        } else
        if(!isRunning && !isBeginning) {
            setIsRunning(true)
        } else
        if(isRunning && !isBeginning) {
            setIsRunning(false)
        }
    }

    const handleReset = () => {
        setIsRunning(false)
        setIsBeginning(true)
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
