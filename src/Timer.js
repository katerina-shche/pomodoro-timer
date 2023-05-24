import React from 'react'
//styles
import './Timer.css'

export default function Timer({ title, timeString}) {
  return (
    <div id='timer'>
        <h2 id='timer-label'>{title}</h2>
        <div id='time-left'>{timeString}</div>
        <div id='start_stop'>start_stop</div>
        <div id='reset'>reset</div>
    </div>
  )
}
