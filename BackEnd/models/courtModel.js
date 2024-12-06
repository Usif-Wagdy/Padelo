const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  reserved: { type: Boolean, default: false },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const daySchema = new mongoose.Schema({
  dayOfWeek: { type: String, required: true },
  slots: [slotSchema],
});

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: false },
  location: { type: String, required: false },
  image: { type: String },
  available: { type: Boolean, default: true },
  schedule: [daySchema],
});

module.exports = mongoose.model('Court', courtSchema);
