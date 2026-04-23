const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:     { type: String, enum: ['in','out'], required: true },
  amount:   { type: Number, required: true },
  fromTo:   { type: String, required: true },
  category: { type: String, required: true },
  note:     { type: String, default: '' },
  date:     { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);