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
     <h1 id='main-titile'>25 + 5 clock</h1>
     <div id='break-box'>
        <h2 id='break-label'>Break Length</h2> 
        <div id='break-decrement'> -&gt; </div>
        <div id='break-length'>{breakLength}</div>
        <div id='break-increment'> &lt;- </div>
     </div>
     <div id='session-box'>
      <h1 id='session-label'>Session Length</h1>
        <div id='session-decrement'> -&gt; </div>
        <div id='session-length'>{sessionLength}</div>
        <div id='session-increment'> &lt;- </div>
      </div>
      <Timer timeString={timeString} title={title} />
      <div id='author'>Coded by<br/>Keterina-Shche</div>
      <audio id='beep'></audio>
    </div>
  );
}

export default App;
