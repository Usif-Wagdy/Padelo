const mongoose = require('mongoose');
const slotSchema = require('./slot.model').schema;

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    schedule: [slotSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Place', placeSchema);
