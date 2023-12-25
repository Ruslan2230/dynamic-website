const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
    });
}

module.exports = createApolloServer;