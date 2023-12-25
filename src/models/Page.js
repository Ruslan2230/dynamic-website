const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    layout: {
        headerStyle: String,
        footerStyle: String,
    },
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;