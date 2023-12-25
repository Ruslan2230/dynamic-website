import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMutation } from '@apollo/client';
// @ts-ignore
import UPDATE_STYLE_MUTATION from '../graphql/mutations/updateStyle.graphql';

interface Style {
    backgroundColor: string;
    color: string;
    primaryFont: string;
    secondaryFont: string;
}

const StyleEditor: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [style, setStyle] = useState<Style>({ backgroundColor: '#fff', color: '#000', primaryFont: 'Arial', secondaryFont: 'Helvetica' });
    const [updateStyleMutation] = useMutation(UPDATE_STYLE_MUTATION);

    const updateStyle = (newStyle: Partial<Style>) => {
        setStyle({ ...style, ...newStyle });
        updateStyleMutation({ variables: { style: { ...style, ...newStyle } } });
    };

    return (
        <div>
            <input
                type="color"
                value={style.backgroundColor}
                onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
            />
            <input
                type="color"
                value={style.color}
                onChange={(e) => updateStyle({ color: e.target.value })}
            />
        </div>
    );
};

export default StyleEditor;
