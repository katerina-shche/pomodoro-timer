import { useState, useRef } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';
import Timer from './components/Timer';
import beep from './assets/buzz-beep.wav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function App() {
  
  const { color, breakLength, sessionLength, startMinutes, changeColor, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength } = useTimer()
  const [title, setTitle] = useState('Session')

  const [isDisabled, setIsDisabled] = useState(false)
  const audioRef = useRef(null)

  const onSwitchToBreak = () => {
      setTitle('Break')
      setMinutes(breakLength)
    }
  const onSwitchToSession = () => {
      setTitle('Session')
      setMinutes(sessionLength)
    } 
  const onIsRunning = (isRunning) => {
    setIsDisabled(isRunning)
  }

  
  
 

  return (
    <div className="App" style={{ background: color }}>
     <h1 id='main-titile' onClick={() => changeColor('pink')}>25 + 5 clock</h1>
     <div id='adjustments'>
        <div id='break-box'>
          <h2 id='break-label'>Break Length</h2> 
          <div className='toolbox'>
            <button id='break-decrement' className='btn' onClick={() => decrementBreakLength(breakLength)} disabled={isDisabled}>
              <FontAwesomeIcon icon={faAngleDown} className='icon'/>
            </button>
            <div id='break-length'>{breakLength}</div>
            <button id='break-increment' className='btn' onClick={() => incrementBreakLength(breakLength)} disabled={isDisabled}>
              <FontAwesomeIcon icon={faAngleUp} className='icon'/>
            </button>
          </div>
        </div>
       <div id='session-box'>
          <h2 id='session-label'>Session Length</h2>
          <div className='toolbox'>
            <button id='session-decrement' className='btn' onClick={() => decrementSessionLength(sessionLength)} disabled={isDisabled}>
              <FontAwesomeIcon icon={faAngleDown} className='icon'/>
            </button>
            <div id='session-length'>{sessionLength}</div>
            <button id='session-increment' className='btn' onClick={() => incrementSessionLength(sessionLength)} disabled={isDisabled}>
              <FontAwesomeIcon icon={faAngleUp} className='icon'/>
            </button>
          </div>
        </div>
      </div>
       <Timer title={title} minutes={startMinutes} onSwitchToSession={onSwitchToSession} onSwitchToBreak={onSwitchToBreak} onIsRunning={onIsRunning}/>
      <div id='author'>Coded by<br/>Katerina-Shche</div>
      <audio ref={audioRef} id='beep' volume='1' src={beep} preload='auto'> </audio>
    </div>
  );
}

export default App;
