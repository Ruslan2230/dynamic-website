import React, { ChangeEvent, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

type ThemeName = 'light' | 'dark';

interface Theme {
    backgroundColor: string;
    color: string;
    primaryFont: string;
    secondaryFont: string;
}

interface ThemeContext {
    changeTheme: (themeName: ThemeName) => void;
}

const ThemeSelector: React.FC = () => {
    const { changeTheme } = useTheme() as ThemeContext;
    const [selectedTheme, setSelectedTheme] = useState<string>('');

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as ThemeName;
        setSelectedTheme(newTheme);
        changeTheme(newTheme);
    };

    return (
        <select onChange={handleThemeChange}>
            <option value="light">Світла</option>
            <option value="dark">Темна</option>
        </select>
    );
};

export default ThemeSelector;
