import { createContext, useReducer } from "react"


export const TimerContext = createContext()

// basics
const SECONDS_IN_MINUTES = 60
const MILLISECONDS_IN_SECONDS = 1000

const MAX_TIMER_VALUE_MINUTES = 60
const MIN_TIMER_VALUE_MINUTES = 1
const INITIAL_BRAKE_LENGTH_MINUTES = 5
const INITIAL_SESSION_LENGTH_MINUTES = 25


const minutesToSeconds = (valInMin) => valInMin * SECONDS_IN_MINUTES
const secondsToMinutes = (valInSec) => Math.floor(valInSec / SECONDS_IN_MINUTES)
const remainderSeconds = (valInSec) => Math.floor(valInSec % SECONDS_IN_MINUTES)
const secondsToMilliseconds = (valInSec) => Math.floor(valInSec * MILLISECONDS_IN_SECONDS)
const millisecondsToSeconds = (valInMilliSec) => Math.floor(valInMilliSec / MILLISECONDS_IN_SECONDS)

const displayTimeLeft = (valInSec) => {
    if (valInSec < 0) {
        valInSec = 0
    }
    const min = secondsToMinutes(valInSec);
    const sec = remainderSeconds(valInSec);
    const display = `${min < 10 ? '0' : '' }${min}:${sec < 10 ? '0' : '' }${sec}`;
    return display
  }

const timerReducer = (state, action) => {
    console.log(state) 
    switch (action.type) {
        case 'BREAK_INCREMENT':
            if (state.breakLength < state.maxSessionLength) {
            return { ...state, breakLength: state.breakLength+1 } 
            } else return state
        case 'BREAK_DECREMENT':
            if (state.breakLength > state.minSessionLength) {
            return { ...state, breakLength: state.breakLength-1 }
            } else return state
        case 'SESSION_INCREMENT':
            if (state.sessionLength < state.maxSessionLength) {
            return { ...state,
                    sessionLength: state.sessionLength+1,
                    startMinutes: state.sessionLength+1,
                    secondsLeft: minutesToSeconds(state.sessionLength+1),
                    timeString: displayTimeLeft(minutesToSeconds(state.sessionLength+1))
                    }
            } else return state
        case 'SESSION_DECREMENT':
            if (state.sessionLength > state.minSessionLength) {
            return { ...state, 
                    sessionLength: state.sessionLength-1,
                    startMinutes: state.sessionLength-1,
                    secondsLeft: minutesToSeconds(state.sessionLength-1),
                    timeString: displayTimeLeft(minutesToSeconds(state.sessionLength-1))
                    }
            } else return state
        case 'START':
            return { ...state,
                    isRunning: true,
                    startMoment: action.payload,
                    endMoment: secondsToMilliseconds(action.payload + state.secondsLeft)
                    }
        case 'SWITCH_TO_BREAK':
            return { ...state,
                    isSession: false,
                    isRunning: true,
                    startMinutes: state.breakLength,
                    startMoment: action.payload,
                    endMoment: action.payload + minutesToSeconds(state.breakLength)*1000,
                    secondsLeft: Math.round(((action.payload + minutesToSeconds(state.breakLength) * 1000) - Date.now()) / MILLISECONDS_IN_SECONDS),
                    timeString: displayTimeLeft(Math.round(millisecondsToSeconds(action.payload + secondsToMilliseconds(minutesToSeconds(state.breakLength)) - Date.now())))
                    }
        case 'SWITCH_TO_SESSION':
            return { ...state,
                    isSession: true,
                    isRunning: true,
                    startMinutes: state.sessionLength,
                    startMoment: action.payload,
                    endMoment: action.payload + minutesToSeconds(state.sessionLength)*1000,
                    secondsLeft: Math.round(((action.payload + minutesToSeconds(state.sessionLength) * 1000) - Date.now()) / 1000),
                    timeString: displayTimeLeft(Math.round(((action.payload + minutesToSeconds(state.sessionLength) * 1000) - Date.now()) / 1000))
                    }
        case 'RESET':
            return { ...action.payload, isRunning: false }
        case 'PLAYPAUSE':
            if (state.isRunning) {
                return { ...state, isRunning: false }
            } else {
            // 'start to run: set start and end and setInterval'
                return timerReducer( state, { type: 'START', payload: action.payload } )
            }
        case 'TICK':
            if (state.secondsLeft <= 0 && state.isSession) {
                return timerReducer(state, { type: 'SWITCH_TO_BREAK', payload: Date.now() })
            } else if (state.secondsLeft <= 0 && !state.isSession) {
                return timerReducer(state, { type: 'SWITCH_TO_SESSION', payload: Date.now() })
            } else {
                return { ...state, secondsLeft: Math.round((state.endMoment - Date.now()) / 1000), timeString: displayTimeLeft(Math.round((state.endMoment - Date.now()) / 1000))}
            }
        default: 
            return state
    }
       
}

export function TimerProvider({ children }) {


    const initialState = {
        //Settings
        sessionLength: INITIAL_SESSION_LENGTH_MINUTES,
        breakLength: INITIAL_BRAKE_LENGTH_MINUTES,
        maxSessionLength: MAX_TIMER_VALUE_MINUTES,
        minSessionLength: MIN_TIMER_VALUE_MINUTES,
        maxBreakLength: MAX_TIMER_VALUE_MINUTES,
        startMinutes: INITIAL_SESSION_LENGTH_MINUTES,
        //State
        secondsLeft: minutesToSeconds(INITIAL_SESSION_LENGTH_MINUTES),
        timeString: displayTimeLeft(minutesToSeconds(INITIAL_SESSION_LENGTH_MINUTES)),
        isRunning: false,
        // should I add isDisabled (for buttons) = isRunning for better readability??
        isSession: true,
        startMoment: null,
        endMoment: null
    }
    const [state, dispatch] = useReducer(timerReducer, initialState)

    const incrementBreakLength = () => {
        dispatch({ type: 'BREAK_INCREMENT' })
    }
    const decrementBreakLength = () => {
            dispatch({ type: 'BREAK_DECREMENT' })
    }
    const incrementSessionLength = () => {
            dispatch({ type: 'SESSION_INCREMENT'})
    }
    const decrementSessionLength = () => {
            dispatch({ type: 'SESSION_DECREMENT' })
    }

    const reset = () => {
        dispatch( { type: 'RESET', payload: initialState })
    }
    const playPause = (timestamp) => {
        dispatch({ type: 'PLAYPAUSE', payload: timestamp })
    }
    const tick = (timestamp) => {
        dispatch({ type: 'TICK', payload: timestamp })
    }

    const switchToBreak = () => {
        dispatch({ type: 'SWITCH_TO_BREAK'})
    }

    const switchToSession = () => {
        dispatch({ type: 'SWITCH_TO_SESSION'})
    }

    const start = (timestamp) => {
        dispatch({type: 'START', payload: timestamp })
    }
    

    return (
        <TimerContext.Provider value={{ ...state, start, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength, reset, playPause, tick, switchToBreak, switchToSession }}>
            {children}
        </TimerContext.Provider>
    )
}