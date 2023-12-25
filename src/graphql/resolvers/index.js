const themeResolvers = require('../resolvers/themeResolvers');
const pageResolvers = require('./pageResolvers');

const resolvers = {
    Query: {
        ...themeResolvers.Query,
        ...pageResolvers.Query,
    },
    Mutation: {
        ...themeResolvers.Mutation,
        ...pageResolvers.Mutation,
    },
};

module.exports = { resolvers };
