const Theme = require('../../models/Theme'); // Переконайтеся, що шлях до моделі Theme вірний

const themeResolvers = {
    Query: {
        getAllThemes: async () => {
            try {
                const themes = await Theme.find();
                return themes;
            } catch (error) {
                console.log(error);
                throw new Error('Error fetching themes');
            }
        },

        getThemeById: async (_, { id }) => {
            try {
                const theme = await Theme.findById(id);
                return theme;
            } catch (error) {
                console.log(error);
                throw new Error('Error fetching theme');
            }
        },
    },
    Mutation: {
        createTheme: async (_, { themeInput }) => {
            try {
                const newTheme = new Theme(themeInput);
                const savedTheme = await newTheme.save();
                return savedTheme;
            } catch (error) {
                console.log(error);
                throw new Error('Error creating a new theme');
            }
        },
        updateStyle: async (_, { style }) => {
            try {
                const { id, ...newStyles } = style;
                const updatedTheme = await Theme.findByIdAndUpdate(id, newStyles, { new: true });
                return updatedTheme;
            } catch (error) {
                console.log(error);
                throw new Error('Error updating style');
            }
        },
    },
};

module.exports = themeResolvers;
