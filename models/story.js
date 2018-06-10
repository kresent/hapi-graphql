const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  name: String,
  url: String,
  chapters: [String]
})

module.exports = mongoose.model('Story', StorySchema);