import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PAGE_QUERY = gql`
    query GetPage($pageId: ID!) {
        getPageById(id: $pageId) {
            id
            title
            layout {
                headerStyle
                footerStyle
            }
  
        }
    }
`;

export default function DynamicPage() {
    const router = useRouter();
    const { pageId } = router.query;

    const { data, loading, error } = useQuery(GET_PAGE_QUERY, {
        variables: { pageId },
        skip: !pageId,
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading page: {error.message}</div>;
    if (!data) return <div>Page not find</div>;

    const { title, content } = data.getPageById;

    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
