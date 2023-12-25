import React, { useState, ChangeEvent } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMutation } from '@apollo/client';
// @ts-ignore
import UPDATE_STYLE_MUTATION from '../graphql/mutations/updateStyle.graphql';

const UpdateStyleComponent: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [updateStyle, {data,  loading, error }] = useMutation(UPDATE_STYLE_MUTATION);
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('');

    const handleStyleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'backgroundColor') {
            setBackgroundColor(value);
        } else if (name === 'textColor') {
            setTextColor(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateStyle({ variables: { style: theme } });
    };

    if (loading) return <div>Оновлення...</div>;
    if (error) return <div>Помилка оновлення стилю: {error.message}</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Колір фону:</label>
                    <input
                        type="color"
                        name="backgroundColor"
                        value={backgroundColor}
                        onChange={handleStyleChange}
                    />
                </div>
                <div>
                    <label>Колір тексту:</label>
                    <input
                        type="color"
                        name="textColor"
                        value={textColor}
                        onChange={handleStyleChange}
                    />
                </div>
                <button type="submit">Оновити стиль</button>
            </form>
        </div>
    );
};

export default UpdateStyleComponent;
