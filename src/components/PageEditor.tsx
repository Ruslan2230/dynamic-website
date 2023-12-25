import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMutation } from '@apollo/client';
// @ts-ignore
import CREATE_PAGE_MUTATION from '../graphql/mutations/createPage.graphql';

interface PageData {
    title: string;
    content: string;
}
const PageEditor: React.FC = () => {
    const { theme } = useTheme();

    const [createPage,  { data, loading, error }] = useMutation(CREATE_PAGE_MUTATION);
    const [pageDetails, setPageDetails] = useState({ title: '', layout: { headerStyle: '', footerStyle: '' } });

    const handleCreatePage = () => {
        createPage({ variables: { pageDetails } });
    };

    const handleSave = (pageData: PageData) => {
        createPage({ variables: { pageDetails: pageData } });
    };

    return (
        <div>
            <button onClick={handleCreatePage}>Створити сторінку</button>
        </div>
    );
};

export default PageEditor;