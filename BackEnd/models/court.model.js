const mongoose = require('mongoose');

// Default 16 slots per day
const defaultSlots = Array.from({ length: 16 }, (_, i) => ({
  number: i + 1,
  reserved: false,
}));

// Slot schema
const slotSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  reserved: { type: Boolean, default: false },
});

// Day schedule schema
const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  slots: [slotSchema],
});

// Review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

// Court schema
const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true },
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

    // Reviews & Ratings
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Calculate average rating before saving
courtSchema.pre('save', function (next) {
  const validReviews = this.reviews.filter(
    (r) => typeof r.rating === 'number',
  );

  if (validReviews.length > 0) {
    const totalRating = validReviews.reduce(
      (sum, r) => sum + r.rating,
      0,
    );
    this.averageRating = totalRating / validReviews.length;
  } else {
    this.averageRating = 0;
  }

  next();
});

module.exports = mongoose.model('Court', courtSchema);
