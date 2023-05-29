import { useState, useRef } from 'react';
import './App.css';
import Timer from './Timer';
import beep from './assets/buzz-beep.wav'

function App() {

  const [title, setTitle] = useState('Session')
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [minutes, setMinutes] = useState(25)
  const onSwitchToBreak = () => {
      setTitle('Break')
      setMinutes(breakLength)
    }
  const onSwitchToSession = () => {
      setTitle('Session')
      setMinutes(sessionLength)
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
        <div id='break-decrement' onClick={handleBreakDecrement}> -&gt; </div>
        <div id='break-length'>{breakLength}</div>
        <div id='break-increment' onClick={handleBreakIncrement}> &lt;- </div>
     </div>
     <div id='session-box'>
      <h1 id='session-label'>Session Length</h1>
        <div id='session-decrement' onClick={handleSessionDecrement}> -&gt; </div>
        <div id='session-length'>{sessionLength}</div>
        <div id='session-increment' onClick={handleSessionIncrement}> &lt;- </div>
      </div>
       <Timer title={title} minutes={minutes} onReset={onReset} onSwitchToSession={onSwitchToSession} onSwitchToBreak={onSwitchToBreak}/>
      <div id='author'>Coded by<br/>Katerina-Shche</div>
      <audio id='beep' volume='1' src={beep}></audio>
    </div>
  );
}

export default App;
