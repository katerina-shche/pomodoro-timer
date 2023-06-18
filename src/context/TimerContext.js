import { createContext, useReducer } from "react"

export const TimerContext = createContext()

const timerReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'BREAK_INCREMENT':
            return { ...state, breakLength: action.payload }
        case 'BREAK_DECREMENT':
            return { ...state, breakLength: action.payload }
        case 'SESSION_INCREMENT':
            return { ...state, sessionLength: action.payload, startMinutes: action.payload }
        case 'SESSION_DECREMENT':
            return { ...state, sessionLength: action.payload, startMinutes: action.payload }
        case 'RESET':
            return { ...action.payload }
        case 'PLAYPAUSE':
            return { ...state, isRunning: action.payload }
        default: 
            return state
    }
}

export function TimerProvider({ children }) {
    const initialState = {
        color: 'red',
        sessionLength: 25,
        breakLength: 5,
        startMinutes: 25,
        secondsLeft: 25*60,
        isRunning: false,
        isSession: true,
        isDisabled: false
    }
    const [state, dispatch] = useReducer(timerReducer, initialState)

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    }

    //how to increment/decriment +/- 1 without passing an initial value?
    const incrementBreakLength = (breakLength) => {
        dispatch({ type: 'BREAK_INCREMENT', payload: breakLength+1 })
    }
    const decrementBreakLength = (breakLength) => {
        dispatch({ type: 'BREAK_DECREMENT', payload: breakLength-1 })
    }
    const incrementSessionLength = (sessionLength) => {
        dispatch({ type: 'SESSION_INCREMENT', payload: sessionLength+1 })
    }
    const decrementSessionLength = (sessionLength) => {
        dispatch({ type: 'SESSION_DECREMENT', payload: sessionLength-1 })
    }

    // need to add audio.pause() and audio.currentTime = 0
    const reset = () => {
        dispatch( { type: 'RESET', payload: initialState })
    }
    const playPause = (isRunning) => {
        dispatch({ type: 'PLAYPAUSE', payload: !isRunning })
    }
    

    return (
        <TimerContext.Provider value={{ ...state, changeColor, incrementBreakLength, decrementBreakLength, incrementSessionLength, decrementSessionLength, reset, playPause }}>
            {children}
        </TimerContext.Provider>
    )
}