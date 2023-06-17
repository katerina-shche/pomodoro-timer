import { createContext, useReducer } from "react"

export const TimerContext = createContext()

const timerReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        default: 
            return state
    }
}

export function TimerProvider({ children }) {
    const [state, dispatch] = useReducer(timerReducer, {
        color: 'red',
        sessionLength: 25,
        breakLength: 5,
        secondsLeft: 25*60,
        isRunning: false,
        isSession: true,
        isDisabled: false
    })

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    }
    const incrementBreakLength = (breakLength) => {
        dispatch({ type: 'BREAK_INCREMENT', payload: (breakLength++) })
    }
    

    return (
        <TimerContext.Provider value={{ ...state, changeColor}}>
            {children}
        </TimerContext.Provider>
    )
}