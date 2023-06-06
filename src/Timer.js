import React, { useState, useEffect, useRef } from 'react'
//styles
import './Timer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

export default function Timer({ audioRef, title, minutes, onReset, onSwitchToBreak, onSwitchToSession, onIsRunning }) {
    const prevMinutes = useRef(minutes)
    const prevTitle = useRef(title)
    const [isRunning, setIsRunning] = useState(false)
    const secondsLeft = useRef(minutes * 60)
    const displayTimeLeft = (anySeconds) => {
        if (anySeconds < 0) {
            anySeconds = 0
        }
        const minutes = Math.floor(anySeconds / 60);
        const remainderSeconds = anySeconds % 60;
        const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
        return display
      }
    const [timeString, setTimeString] = useState(displayTimeLeft(minutes * 60))
    const [isPlaying, setIsPlaying] = useState(false)

    

    useEffect(() => {
        const audio = document.querySelector('audio')
        // comparing if prevMinutes and current minutes are different and stop and update the timer
        if (prevMinutes.current !== minutes) {
            secondsLeft.current = minutes * 60
            setTimeString(displayTimeLeft(secondsLeft.current))
            prevMinutes.current = minutes
        }
        // tracking title switch
        if (prevTitle.current !== title) {
            secondsLeft.current = minutes * 60
            setTimeString(displayTimeLeft(secondsLeft.current))
            prevMinutes.current = minutes
            prevTitle.current = title
        }
        // if no new minutes then everething else goes as usual
        let timer = null
        const now = Date.now();
        const then = now + secondsLeft.current * 1000

            if(isRunning) {
                timer = setInterval(() => {
                // check if we should stop it!
                 if (secondsLeft.current <= 0) {
                    setTimeString('00:00')
                    //here was 0 before and it leads to -1
                    secondsLeft.current = NaN
                    clearInterval(timer)
                    if (title === "Session") {
                        onSwitchToBreak()
                    } else {
                        onSwitchToSession()
                    }
                    audio.currentTime = 0; // rewind to the start
                    audio.play()
                    .then(() => {
                        setIsPlaying(true)
                        console.log('Playback started successfully');
                        // Additional actions after successful playback
                      })
                      .catch(error => {
                        setIsPlaying(false)
                        console.log('Failed to start playback:', error);
                        // Additional error handling or fallback behavior
                      });
                    } 
                secondsLeft.current = Math.round((then - Date.now()) / 1000)
                setTimeString(displayTimeLeft(secondsLeft.current))  
            }, 1000)
            }
            
        return () => {
            clearInterval(timer)
        }
}, [isRunning, minutes, onSwitchToBreak, title, onSwitchToSession, audioRef])

  

    const handleToggle = () => {
        setIsRunning(!isRunning)
        onIsRunning(!isRunning)
    }

    const handleReset = (timer) => {
        clearInterval(timer)
        setIsRunning(false)
        onIsRunning(false)
        //uppdating min to 5 and 25 in App.js
        onReset()
        secondsLeft.current = 25 * 60
        setTimeString(displayTimeLeft(25 * 60))
        onSwitchToSession()
        const audio = document.querySelector('audio')
        if (isPlaying) {
            audio.pause()
            console.log('audio has been paused')
            setIsPlaying(false)
        }
        audio.currentTime = 0; // rewind to the start
    }

  return (
    <div id='timer'>
        <div id='timer-frame'>
            <h2 id='timer-label'>{title}</h2>
            <div id='time-left'>{timeString}</div>
        </div>
        <div id='button-box'>
            <button id='start_stop' className="icon" onClick={handleToggle}>{isRunning ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</button>
            <button id='reset' className="icon" onClick={handleReset}><FontAwesomeIcon icon={faPowerOff} /></button>
        </div>
    </div>
  )
}
