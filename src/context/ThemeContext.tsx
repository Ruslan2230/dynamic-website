import { createContext, useContext, useState } from 'react';

type ThemeName = 'light' | 'dark';

const themes = {
    light: {
        backgroundColor: '#fff',
        color: '#000',
        primaryFont: 'Arial',
        secondaryFont: 'Helvetica',
    },
    dark: {
        backgroundColor: '#333',
        color: '#fff',
        primaryFont: 'Times New Roman',
        secondaryFont: 'Georgia',
    },
};
interface Theme {
    backgroundColor: string;
    color: string;
    primaryFont: string;
    secondaryFont: string;
}
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    changeTheme: (themeName: ThemeName) => void;
}

const defaultTheme: Theme = {
    backgroundColor: '#fff',
    color: '#000',
    primaryFont: 'Arial',
    secondaryFont: 'Helvetica'
};

const defaultThemeContextValue: ThemeContextType = {
    theme: defaultTheme,
    setTheme: (theme: Theme) => {},
    changeTheme: (themeName: ThemeName) => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(themes.light);

    const changeTheme = (themeName: ThemeName) => {
        const newTheme = themes[themeName];
        if (newTheme) {
            setTheme(newTheme);
        } else {
            console.error(`Theme "${themeName}" not find.`);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
