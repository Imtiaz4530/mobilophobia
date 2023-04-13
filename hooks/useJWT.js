import { useEffect, useState } from "react";

export const useLocalStorage = (jwtValue) => {
    const [value, setValue] = useState(jwtValue);

    useEffect(() => {
        const stored = localStorage.getItem("token");

        if (value === undefined) {
            return
        }

        setValue(stored ? JSON.parse(stored) : jwtValue);
    }, [jwtValue]);

    useEffect(() => {
        if (value === undefined) {
            return
        }

        if (value.length < 10) {
            return
        }
        
        localStorage.setItem("token", JSON.stringify(value));
    }, [value]);

    return {
        value
    }
}