import './App.css';

function App() {
  return (
    <div className="App">
     <div id='main-titile'>25 + 5 clock</div>
     <div id='break-label'>Break Length
        <div id='break-decrement'> -&gt; </div>
        <div id='break-length'>5</div>
        <div id='break-increment'> &lt;- </div>
     </div>
     <div id='session-label'>Session Length
        <div id='session-decrement'> -&gt; </div>
        <div id='session-length'>25</div>
        <div id='session-increment'> &lt;- </div>
      </div>
      <div id='timer-label'> Session
          <div id='time-left'>00:00</div>
          <div id='start_stop'>start_stop</div>
          <div id='reset'>reset</div>
      </div>
      <div id='author'>Coded by<br/>Keterina-Shche</div>
      <audio id='beep'></audio>
    </div>
  );
}

export default App;
