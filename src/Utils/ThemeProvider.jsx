import { createContext, useContext, useEffect, useState } from "react";

const initalState = {
    theme:'system',
    toggleTheme: () => {}
}


const ThemeProviderContext = createContext(initalState);

export const ThemeProvider = ({children, defaultTheme='system', storageKey='vite-ui-theme', ...props}) => {
    const [theme, setTheme] = useState(()=>(localStorage.getItem(storageKey)) || defaultTheme)

    useEffect(()=>{
        const root = window.document.documentElement;
        root.classList.remove("light", 'dark');
        if (theme === 'system'){
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            setTheme(systemTheme);
            return
        }
        root.classList.add(theme);
    }, [theme])

    const value = {
        theme,
        toggleTheme: () => {
            setTheme((prevTheme) => {
                const newTheme = prevTheme === 'light' ? 'dark' : 'light';
                localStorage.setItem(storageKey, newTheme);
                return newTheme;
            })
        }
    }

    return (
        <ThemeProviderContext.Provider value={value} {...props}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context;
}