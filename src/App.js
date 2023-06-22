import { useRef } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';
import Timer from './components/Timer';
import beep from './assets/newBeep.wav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function App() {
  
  const { isRunning, breakLength, sessionLength, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength } = useTimer()
  const audioRef = useRef(null)

  return (
    <div className="App">
     <h1 id='main-titile'>25 + 5 clock</h1>
     <div id='adjustments'>
        <div id='break-box'>
          <h2 id='break-label'>Break Length</h2> 
          <div className='toolbox'>
            <button id='break-decrement' className='btn' onClick={() => decrementBreakLength()} disabled={isRunning}>
              <FontAwesomeIcon icon={faAngleDown} className='icon'/>
            </button>
            <div id='break-length'>{breakLength}</div>
            <button id='break-increment' className='btn' onClick={() => incrementBreakLength()} disabled={isRunning}>
              <FontAwesomeIcon icon={faAngleUp} className='icon'/>
            </button>
          </div>
        </div>
       <div id='session-box'>
          <h2 id='session-label'>Session Length</h2>
          <div className='toolbox'>
            <button id='session-decrement' className='btn' onClick={() => decrementSessionLength()} disabled={isRunning}>
              <FontAwesomeIcon icon={faAngleDown} className='icon'/>
            </button>
            <div id='session-length'>{sessionLength}</div>
            <button id='session-increment' className='btn' onClick={() => incrementSessionLength()} disabled={isRunning}>
              <FontAwesomeIcon icon={faAngleUp} className='icon'/>
            </button>
          </div>
        </div>
      </div>
       <Timer />
      <div id='author'>Coded by<br/>Katerina-Shche</div>
      <audio ref={audioRef} id='beep' volume='1' src={beep} preload='auto'> </audio>
    </div>
  );
}

export default App;
