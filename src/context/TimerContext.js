import { createContext } from "react"

export const TimerContext = createContext()

export function TimerProvider({ children }) {

    return (
        <TimerContext.Provider value={{ color: 'blue' }}>
            {children}
        </TimerContext.Provider>
    )
}