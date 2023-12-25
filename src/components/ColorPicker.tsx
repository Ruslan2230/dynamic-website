import React, { ChangeEvent } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ColorPickerProps {
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
    const { theme, setTheme } = useTheme();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onColorChange(e.target.value);
    };

    return (
        <input type="color" onChange={handleChange} />
);
};

export default ColorPicker;
