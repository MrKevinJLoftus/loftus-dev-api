const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  kebabTitle: { type: String, required: true },
  body: { type: String, required: true },
  blurb: { type: String, required: true },
  tags: { type: [String], required: true }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
