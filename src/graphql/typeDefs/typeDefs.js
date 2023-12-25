const { gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, './schema.graphql');
const typeDefs = gql(fs.readFileSync(schemaPath, 'utf-8'));
module.exports = { typeDefs };
