const Reservation = require('../models/reservation.model');
const Court = require('../models/court.model');
const Place = require('../models/place.model');
const Slot = require('../models/slot.model');
// TODO: User model is not made yet
const User = require('../models/user.model');

exports.addReservation = async (req, res) => {
  try {
    const {
      user,
      court,
      place,
      slot,
      status = 'reserved',
    } = req.body;

    const existingReservation = await Reservation.findOne({
      user,
      court,
      place,
      slot,
      status: 'reserved',
    });

    if (existingReservation) {
      return res.status(400).json({
        message:
          'A reservation with the same details already exists',
      });
    }

    const courtExists = await Court.findById(court);
    if (!courtExists) {
      return res
        .status(404)
        .json({ message: 'Court not found' });
    }

    const placeExists = courtExists.places.id(place);
    if (!placeExists) {
      return res
        .status(404)
        .json({ message: 'Place not found in this court' });
    }

    const slotExists = placeExists.schedule.id(slot);
    if (!slotExists) {
      return res
        .status(404)
        .json({ message: 'Slot not found in this place' });
    }

    const now = new Date();
    if (slotExists.endTime < now) {
      return res.status(400).json({
        message:
          'Cannot reserve a slot that has already passed',
      });
    }

    const newReservation = new Reservation({
      user,
      court,
      place,
      slot,
      status,
    });

    await newReservation.save();

    res.status(201).json({
      message: 'Reservation added successfully!',
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding reservation',
      error: error.message,
    });
  }
};

// TODO: The user model is not made yet
exports.getUserReservations = async (req, res) => {
  try {
    const { user } = req.query;
    const { page = 1, limit = 10 } = req.query;

    if (!user) {
      return res.status(400).json({
        message: 'User ID is required',
      });
    }

    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const reservations = await Reservation.find({ user })
      .populate('court')
      .populate('place')
      .populate('slot')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalReservations =
      await Reservation.countDocuments({ user });

    res.status(200).json({
      reservations,
      totalPages: Math.ceil(totalReservations / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user reservations',
      error: error.message,
    });
  }
};

exports.getCourtReservations = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const courtExists = await Court.findById(courtId);
    if (!courtExists) {
      return res.status(404).json({
        message: 'Court not found',
      });
    }

    const reservations = await Reservation.find({
      court: courtId,
    })
      .populate('user')
      .populate('place')
      .populate('slot')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalReservations =
      await Reservation.countDocuments({ court: courtId });

    res.status(200).json({
      reservations,
      totalPages: Math.ceil(totalReservations / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching court reservations',
      error: error.message,
    });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found',
      });
    }

    if (reservation.status !== 'reserved') {
      return res.status(400).json({
        message:
          'Only reserved reservations can be cancelled',
      });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.status(200).json({
      message: 'Reservation cancelled successfully!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error cancelling reservation',
      error: error.message,
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    // TODO: Implement admin authentication middleware
    // This is a placeholder for admin-only reservation deletion
    const { id } = req.params;

    const deletedReservation =
      await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({
        message: 'Reservation not found',
      });
    }

    res.status(200).json({
      message: 'Reservation deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting reservation',
      error: error.message,
    });
  }
};

exports.searchReservations = async (req, res) => {
  try {
    const {
      user,
      court,
      place,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    // Build dynamic search query
    const searchQuery = {};

    if (user) searchQuery.user = user;
    if (court) searchQuery.court = court;
    if (place) searchQuery.place = place;
    if (status) searchQuery.status = status;

    // Date range search for slots
    if (startDate || endDate) {
      searchQuery['slot.startTime'] = {};
      if (startDate)
        searchQuery['slot.startTime'].$gte = new Date(
          startDate,
        );
      if (endDate)
        searchQuery['slot.startTime'].$lte = new Date(
          endDate,
        );
    }

    const reservations = await Reservation.find(searchQuery)
      .populate('user')
      .populate('court')
      .populate('place')
      .populate('slot')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalReservations =
      await Reservation.countDocuments(searchQuery);

    res.status(200).json({
      reservations,
      totalPages: Math.ceil(totalReservations / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching reservations',
      error: error.message,
    });
  }
};
