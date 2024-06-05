//istedet for local storage hadde det gått ann å bruke firebase database her for å ha ein backend. men har kje tid farh
import { useState, useEffect } from "react"

export default function useLocalStorage(key, defaultlValue) {
    const [value, setValue] = useState (() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultlValue === "function") {
            return defaultlValue()
        } else {
            return defaultlValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [ value, setValue ]
    }