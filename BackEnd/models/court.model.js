const mongoose = require('mongoose');

// Define the default slots array
const defaultSlots = Array.from({ length: 16 }, (_, i) => ({
  number: i + 1,
  reserved: false,
}));

const slotSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  reserved: { type: Boolean, default: false },
});

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  slots: [slotSchema],
});

const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    image: { type: String },
    schedule: {
      type: [daySchema],
      default: [
        { day: 'Monday', slots: defaultSlots },
        { day: 'Tuesday', slots: defaultSlots },
        { day: 'Wednesday', slots: defaultSlots },
        { day: 'Thursday', slots: defaultSlots },
        { day: 'Friday', slots: defaultSlots },
        { day: 'Saturday', slots: defaultSlots },
        { day: 'Sunday', slots: defaultSlots },
      ],
    },
    bookingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Court', courtSchema);
