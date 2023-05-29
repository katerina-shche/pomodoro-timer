import { useState } from 'react';
import './App.css';
import Timer from './Timer';
import beep from './assets/buzz-beep.wav'

function App() {

  const [title, setTitle] = useState('Session')
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [minutes, setMinutes] = useState(25)
  const [isDisabled, setIsDisabled] = useState(false)
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
  const onReset = () => {
    setBreakLength(5)
    setSessionLength(25)
    if (title === 'Session') {
      setMinutes(25)
    } else {
      setMinutes(5)
    }
  }
  const handleBreakDecrement = () => {
    if (breakLength > 0) {
    setBreakLength(breakLength - 1)
  }
  }
  const handleBreakIncrement = () => {
    setBreakLength(breakLength + 1)
  }
  const handleSessionDecrement = () => {
    if (sessionLength > 0) {
    setSessionLength(sessionLength - 1)
    setMinutes(minutes - 1)
  }
  }
  const handleSessionIncrement = () => {
    setSessionLength(sessionLength + 1)
    setMinutes(minutes + 1)
  }

  return (
    <div className="App">
     <h1 id='main-titile'>25 + 5 clock</h1>
     <div id='break-box'>
        <h2 id='break-label'>Break Length</h2> 
        <button id='break-decrement' onClick={handleBreakDecrement} disabled={isDisabled}> -&gt; </button>
        <div id='break-length'>{breakLength}</div>
        <button id='break-increment' onClick={handleBreakIncrement} disabled={isDisabled}> &lt;- </button>
     </div>
     <div id='session-box'>
      <h1 id='session-label'>Session Length</h1>
        <button id='session-decrement' onClick={handleSessionDecrement} disabled={isDisabled}> -&gt; </button>
        <div id='session-length'>{sessionLength}</div>
        <button id='session-increment' onClick={handleSessionIncrement} disabled={isDisabled}> &lt;- </button>
      </div>
       <Timer title={title} minutes={minutes} onReset={onReset} onSwitchToSession={onSwitchToSession} onSwitchToBreak={onSwitchToBreak} onIsRunning={onIsRunning}/>
      <div id='author'>Coded by<br/>Katerina-Shche</div>
      <audio id='beep' volume='1' src={beep}></audio>
    </div>
  );
}

export default App;
