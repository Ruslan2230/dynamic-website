const Page = require('../../models/Page'); // Переконайтеся, що шлях до моделі Page вірний

const pageResolvers = {
    Query: {
        getAllPages: async () => {
            try {
                const pages = await Page.find();
                return pages;
            } catch (error) {
                console.log(error);
                throw new Error('Error fetching pages');
            }
        },

        getPageById: async (_, { id }) => {
            try {
                const page = await Page.findById(id);
                return page;
            } catch (error) {
                console.log(error);
                throw new Error('Error fetching page');
            }
        },
    },
    Mutation: {
        createPage: async (_, { pageInput }) => {
            try {
                const newPage = new Page(pageInput);
                const savedPage = await newPage.save();
                return savedPage;
            } catch (error) {
                console.log(error);
                throw new Error('Error creating a new page');
            }
        },
    },
};

module.exports = pageResolvers;
