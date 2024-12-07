const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true },
);

const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    image: { type: String },
    available: { type: Boolean, default: true },
    schedule: [slotSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Court', courtSchema);
