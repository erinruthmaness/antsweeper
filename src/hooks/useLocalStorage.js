import { useState } from "react";

/*=============================================/
/ code adapted from:                           /
/ https://usehooks.com/useLocalStorage/        /
/=============================================*/

const useLocalStorage = (defaultStats) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [userStats, setUserStats] = useState(() => {
        if (typeof window === "undefined") {
            return defaultStats;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem("antsweeperUserStats");
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : defaultStats;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return defaultStats;
        }
    });
    // Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const saveUserStats = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(userStats) : value;
            // Save state
            setUserStats(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem("antsweeperUserStats", JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [userStats, saveUserStats];
};

export default useLocalStorage;
