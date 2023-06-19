import { createContext, useReducer } from "react"

export const TimerContext = createContext()

const timerReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'BREAK_INCREMENT':
            return { ...state, breakLength: state.breakLength+1 }
        case 'BREAK_DECREMENT':
            return { ...state, breakLength: state.breakLength-1 }
        case 'SESSION_INCREMENT':
            return { ...state, sessionLength: state.sessionLength+1, startMinutes: state.sessionLength+1 }
        case 'SESSION_DECREMENT':
            return { ...state, sessionLength: state.sessionLength-1, startMinutes: state.sessionLength-1 }
        case 'RESET':
            return { ...action.payload }
        case 'PLAYPAUSE':
            if (state.isRunning) {
            return { ...state, isRunning: !state.isRunning }
        } else {
            return 'start to run: set now and then and setInterval'
        }
        case 'TICK':
            return { ...state, secondsLeft: state.secondsLeft-1}
        default: 
            return state
    }
}

export function TimerProvider({ children }) {
//basics
//why in capitals? (what does it mean?)
const SECONDS_IN_MINUTES = 60;

const MAX_TIMER_VALUE_MINUTES = 60;
const INITIAL_BRAKE_LENGTH_MINUTES = 5;
const INITIAL_SESSION_LENGTH_MINUTES = 25;

const minutesToSeconds = (value) => value * SECONDS_IN_MINUTES;
const secondsToMinutes = (value) => Math.round(value / SECONDS_IN_MINUTES);
const remainderSeconds = (value) => Math.round(value % SECONDS_IN_MINUTES);

    const initialState = {
        //Settings
        color: 'red',
        sessionLength: INITIAL_SESSION_LENGTH_MINUTES,
        breakLength: INITIAL_BRAKE_LENGTH_MINUTES,
        maxSessionLength: MAX_TIMER_VALUE_MINUTES,
        maxBreakLength: MAX_TIMER_VALUE_MINUTES,
        startMinutes: INITIAL_SESSION_LENGTH_MINUTES,
        //State
        secondsLeft: INITIAL_SESSION_LENGTH_MINUTES * SECONDS_IN_MINUTES,
        isRunning: false,
        isSession: true,
        isDisabled: false,
        startMoment: null,
        endMoment: null,
    }
    const [state, dispatch] = useReducer(timerReducer, initialState)

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    }

    //how to increment/decriment +/- 1 without passing an initial value?
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
    

    return (
        <TimerContext.Provider value={{ ...state, changeColor, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength, reset, playPause }}>
            {children}
        </TimerContext.Provider>
    )
}