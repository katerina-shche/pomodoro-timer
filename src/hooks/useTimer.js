import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export const useTimer = () => {
    const context = useContext(TimerContext)

    if (context === undefined) {
        throw new Error('useTimer() must be used inside a TimerProvider')
    }

    return context
}