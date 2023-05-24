import { useState } from 'react';
import './App.css';
import Timer from './Timer';

function App() {

  const [title, setTitle] = useState('Session')
  const [breakLength, setBreakLenght] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeString, setTimeString] = useState('00:00')
  return (
    <div className="App">
     <div id='main-titile'>25 + 5 clock</div>
     <div id='break-label'>Break Length
        <div id='break-decrement'> -&gt; </div>
        <div id='break-length'>{breakLength}</div>
        <div id='break-increment'> &lt;- </div>
     </div>
     <div id='session-label'>Session Length
        <div id='session-decrement'> -&gt; </div>
        <div id='session-length'>{sessionLength}</div>
        <div id='session-increment'> &lt;- </div>
      </div>
      <Timer timeLeft={timeString} title={title} />
      <div id='author'>Coded by<br/>Keterina-Shche</div>
      <audio id='beep'></audio>
    </div>
  );
}

export default App;
