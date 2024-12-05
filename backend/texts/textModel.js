const mongoose = require('mongoose');

const TextSchema = mongoose.Schema({
    _id: String,
    h1: String,
    p: String
});

const Text = mongoose.model('Text', TextSchema);
module.exports = Text;