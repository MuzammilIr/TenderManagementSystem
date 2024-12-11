const mongoose = require('mongoose');

const tenderSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Tender', tenderSchema);
