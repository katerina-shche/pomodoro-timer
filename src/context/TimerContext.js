import { createContext, useReducer } from "react"

export const TimerContext = createContext()

//basics
//why in capitals? (what does it mean?)
const SECONDS_IN_MINUTES = 60;

const MAX_TIMER_VALUE_MINUTES = 60;
const INITIAL_BRAKE_LENGTH_MINUTES = 5;
const INITIAL_SESSION_LENGTH_MINUTES = 25;

const minutesToSeconds = (valInMin) => valInMin * SECONDS_IN_MINUTES;
const secondsToMinutes = (valInSec) => Math.round(valInSec / SECONDS_IN_MINUTES);
const remainderSeconds = (valInSec) => Math.round(valInSec % SECONDS_IN_MINUTES);

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
    switch (action.type) {
        case 'BREAK_INCREMENT':
            return { ...state, breakLength: state.breakLength+1 }
        case 'BREAK_DECREMENT':
            return { ...state, breakLength: state.breakLength-1 }
        case 'SESSION_INCREMENT':
            return { ...state, sessionLength: state.sessionLength+1, startMinutes: state.sessionLength+1, secondsLeft: minutesToSeconds(state.sessionLength+1), timeString: displayTimeLeft(minutesToSeconds(state.sessionLength+1)) }
        case 'SESSION_DECREMENT':
            return { ...state, sessionLength: state.sessionLength-1, startMinutes: state.sessionLength-1, secondsLeft: minutesToSeconds(state.sessionLength-1), timeString: displayTimeLeft(minutesToSeconds(state.sessionLength-1))  }
        case 'SWITCH_TO_BREAK':
                return { ...state, startMinutes: state.breakLength, secondsLeft: minutesToSeconds(state.breakLength)}
        case 'SWITCH_TO_SESSION':
                return { ...action.payload }
        case 'RESET':
            return { ...action.payload }
        case 'PLAYPAUSE':
            if (state.isRunning) {
            return { ...state, isRunning: false }
        } else {
            // 'start to run: set now and then and setInterval'
            return { ...state, isRunning: true, startMoment: Date.now(), endMoment: Date.now() + state.secondsLeft * 1000 }
        }
        case 'TICK':
            return { ...state, secondsLeft: Math.round((state.endMoment - Date.now()) / 1000), timeString: displayTimeLeft(Math.round((state.endMoment - Date.now()) / 1000))}
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
        maxBreakLength: MAX_TIMER_VALUE_MINUTES,
        startMinutes: INITIAL_SESSION_LENGTH_MINUTES,
        //State
        secondsLeft: INITIAL_SESSION_LENGTH_MINUTES * SECONDS_IN_MINUTES,
        timeString: displayTimeLeft(minutesToSeconds(INITIAL_SESSION_LENGTH_MINUTES)),
        isRunning: false,
        // should I add isDisabled (for buttons) = isRunning for better readability??
        isSession: true,
        startMoment: null,
        endMoment: null,
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

    // need to add audio.pause() and audio.currentTime = 0
    const reset = () => {
        dispatch( { type: 'RESET', payload: initialState })
    }
    const playPause = () => {
        dispatch({ type: 'PLAYPAUSE' })
    }
    const tick = () => {
        dispatch({ type: 'TICK' })
    }
    

    return (
        <TimerContext.Provider value={{ ...state, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength, reset, playPause, tick }}>
            {children}
        </TimerContext.Provider>
    )
}