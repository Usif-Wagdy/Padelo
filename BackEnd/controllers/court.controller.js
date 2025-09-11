const Court = require('../models/court.model');

exports.searchCourts = async (req, res) => {
  try {
    const { q } = req.query;

    const courts = await Court.find({
      name: { $regex: q, $options: 'i' },
    });

    res.status(200).json({ courts });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error searching courts', error });
  }
};

exports.getCourtById = async (req, res) => {
  try {
    const { id } = req.params;

    const court = await Court.findById(id);

    if (!court) {
      return res
        .status(404)
        .json({ message: 'Court not found' });
    }

    res.status(200).json({ court });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching court', error });
  }
};

exports.getCourts = async (req, res) => {
  try {
    const courts = await Court.find();

    const formattedCourts = courts.map((court) => ({
      ...court.toObject(),
      schedule: court.schedule.map((day) => ({
        ...day,
        slots: day.slots.map((slot) => ({
          number: slot.number,
          reserved: slot.reserved,
        })),
      })),
      reviewCount: court.reviews.length,
    }));

    res.status(200).json({
      courts: formattedCourts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching courts', error });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    let { userId, rating, comment } = req.body;

    rating = Number(rating);

    if (!userId || !rating || !comment) {
      return res.status(400).json({
        message:
          'userId, rating, and comment are all required.',
      });
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    const court = await Court.findById(id);
    if (!court) {
      return res
        .status(404)
        .json({ message: 'Court not found' });
    }

    const newReview = { user: userId, rating, comment };
    court.reviews.push(newReview);

    const totalRatings = court.reviews.reduce(
      (acc, review) => acc + (review.rating || 0),
      0,
    );
    court.averageRating =
      totalRatings / court.reviews.length;

    await court.save();

    res.status(201).json({
      message: 'Review added successfully!',
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding review',
      error: error.message,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const court = await Court.findById(id).populate(
      'reviews.user',
      'name image',
    );

    if (!court) {
      return res
        .status(404)
        .json({ message: 'Court not found' });
    }

    res.status(200).json({
      message: 'Reviews fetched successfully!',
      reviews: court.reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};
