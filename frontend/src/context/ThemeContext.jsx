import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(

        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {

        localStorage.setItem(
            "theme",
            theme
        );

        document.documentElement.className = theme;

    }, [theme]);

    return (

        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >

            {children}

        </ThemeContext.Provider>
    );
}

export function useTheme() {

    return useContext(
        ThemeContext
    );
}