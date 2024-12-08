const mongoose = require('mongoose');
const placeSchema = require('./place.model').schema;

const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    image: { type: String },
    available: { type: Boolean, default: true },
    places: [placeSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Court', courtSchema);
