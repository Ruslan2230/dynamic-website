import { ApolloServer } from 'apollo-server';
const typeDefs = require('./src/graphql/typeDefs/typeDefs');
import resolvers from './src/graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});