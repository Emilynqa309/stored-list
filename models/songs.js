const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    song: String,
    artist: String,
});

module.exports = mongoose.model('Songs', songsSchema);