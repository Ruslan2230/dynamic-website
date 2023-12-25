import { ApolloServer, gql } from 'apollo-server-micro';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

let db;
console.log("conect to db",db )
const connectMongo = async () => {
    if (!db) {
        try {
            const client = new MongoClient('mongodb+srv://Panda:Dori321S!@cluster0.njocgin.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            // db = client.db('yourDatabaseName');
            console.log("conect to db",client )
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }
    return db;
};

const typeDefs = gql`
    type Query {
        getPageById(id: ID!): Page
        getAllPages: [Page]
    }

    type Mutation {
        createPage(pageDetails: PageDetailsInput!): Page
        updatePage(id: ID!, pageDetails: PageDetailsInput!): Page
    }

    type Page {
        id: ID!
        title: String
        layout: Layout
    }

    input PageDetailsInput {
        title: String
        layout: LayoutInput
    }

    type Layout {
        headerStyle: String
        footerStyle: String
    }

    input LayoutInput {
        headerStyle: String
        footerStyle: String
    }
`;

const resolvers = {
    Query: {
        getPageById: async (_, { id }, { db }) => {
            return await db.collection('pages').findOne({ _id: id });
        },
        getAllPages: async (_, args, { db }) => {
            return await db.collection('pages').find({}).toArray();
        },
    },
    Mutation: {
        createPage: async (_, { pageDetails }, { db }) => {
            const response = await db.collection('pages').insertOne(pageDetails);
            return response.ops[0];
        },

        updatePage: async (_, { id, pageDetails }, { db }) => {
            await db.collection('pages').updateOne({ _id: id }, { $set: pageDetails });
            return await db.collection('pages').findOne({ _id: id });
        },
    },
};



const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        db: await connectMongo()
    })
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};


