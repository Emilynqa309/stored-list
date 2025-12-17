const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    song: String,
    by: String,
    listened: Boolean,
});

module.exports = mongoose.model('Songs', songsSchema);