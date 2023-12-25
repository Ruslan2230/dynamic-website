import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';

export function useApollo(initialState?: NormalizedCacheObject) {
    const link = new HttpLink({
        uri: '/api/graphql',
        credentials: 'same-origin',
        fetch,
    });

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache().restore(initialState || {}),
    });

    return client;
}
