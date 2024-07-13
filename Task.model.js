const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    image: String,
    summary: String,
});

module.exports = mongoose.model('Tasks',taskSchema)