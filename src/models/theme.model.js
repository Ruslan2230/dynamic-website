const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    colors: {
        background: String,
        text: String,
        primary: String,
        secondary: String,
    },
    fonts: {
        primary: String,
        secondary: String
    },
    layout: {
        headerStyle: String,
        footerStyle: String
    },
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
