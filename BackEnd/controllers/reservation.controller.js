const Reservation = require('../models/reservation.model');
const Court = require('../models/court.model');
const User = require('../models/user.model');
const sendEmail = require('./../email');
const axios = require('axios');
const mongoose = require('mongoose');
const { startSession } = mongoose;
const fs = require('fs');
const path = require('path');

exports.addReservation = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { user, court, day, slotNumber } = req.body;
    const status = 'reserved';

    const courtExists =
      await Court.findById(court).session(session);
    if (!courtExists) {
      return res
        .status(404)
        .json({ message: 'Court not found' });
    }

    const dayExists = courtExists.schedule.find(
      (d) => d.day === day,
    );
    if (!dayExists) {
      return res.status(404).json({
        message: 'Day not found in this court schedule',
      });
    }

    const slotExists = dayExists.slots.find(
      (slot) =>
        slot.number === slotNumber && !slot.reserved,
    );
    if (!slotExists) {
      return res.status(400).json({
        message: 'Slot not available for reservation',
      });
    }

    const existingReservation = await Reservation.findOne({
      court,
      day,
      slotNumber,
      status,
    }).session(session);
    if (existingReservation) {
      return res.status(400).json({
        message:
          'Sorry, this slot is already reserved. Please choose a different time or place.',
      });
    }

    slotExists.reserved = true;
    await courtExists.save({ session });

    await Court.findByIdAndUpdate(
      court,
      { $inc: { bookingCount: 1 } },
      { session },
    );

    const newReservation = new Reservation({
      user,
      court,
      day,
      slotNumber,
      status,
    });
    const userExists =
      await User.findById(user).session(session);
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    await newReservation.save({ session });
    const invoiceData = {
      data: {
        name: userExists.name,
        invoice_nr: newReservation._id,
        date: day,
        items: [
          {
            item_name: `Court Reservation - Court ${courtExists.name}`,
            hours: 1,
            hourly_price: courtExists.price,
          },
        ],
        subtotal: courtExists.price,
        tax: courtExists.price * 0.1,
        total: courtExists.price * 1.1,
      },
    };
    console.log(invoiceData);

    const pdfBuffer = await generateInvoice(invoiceData);
    await sendEmail({
      email: userExists.email,
      subject: 'Your Reservation Invoice',
      text: `Thank you for reserving Court ${courtExists.name} on ${day}. Your invoice is attached }`,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBuffer,
          encoding: 'base64',
          contentType: 'application/pdf',
        },
      ],
    });

    await session.commitTransaction();
    res.status(201).json({
      message: 'Reservation added successfully!',
      reservation: newReservation,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: 'Error adding reservation',
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const { user } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const reservations = await Reservation.find({ user })
      .populate('court')
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

    const court = await Court.findById(reservation.court);
    const day = court.schedule.find(
      (d) => d.day === reservation.day,
    );
    const slot = day.slots.find(
      (s) => s.number === reservation.slotNumber,
    );
    slot.reserved = false;
    await court.save();

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

exports.completeReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res
        .status(404)
        .json({ message: 'Reservation not found' });
    }
    if (reservation.status !== 'reserved') {
      return res.status(400).json({
        message:
          'Only reserved reservations can be completed',
      });
    }
    const court = await Court.findById(reservation.court);
    const day = court.schedule.find(
      (d) => d.day === reservation.day,
    );
    const slot = day.slots.find(
      (s) => s.number === reservation.slotNumber,
    );

    slot.reserved = false;
    await court.save();

    reservation.status = 'completed';
    await reservation.save();

    res.status(200).json({
      message: 'Reservation completed successfully!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error completing reservation',
      error: error.message,
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation =
      await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({
        message: 'Reservation not found',
      });
    }

    if (deletedReservation.status === 'reserved') {
      const court = await Court.findById(
        deletedReservation.court,
      );
      const day = court.schedule.find(
        (d) => d.day === deletedReservation.day,
      );
      const slot = day.slots.find(
        (s) => s.number === deletedReservation.slotNumber,
      );
      slot.reserved = false;
      await court.save();
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
      status,
      day,
      slotNumber,
      page = 1,
      limit = 10,
    } = req.query;

    const searchQuery = {};

    if (user) searchQuery.user = user;
    if (court) searchQuery.court = court;
    if (status) searchQuery.status = status;
    if (day) searchQuery.day = day;
    if (slotNumber) searchQuery.slotNumber = slotNumber;

    const reservations = await Reservation.find(searchQuery)
      .populate('user')
      .populate('court')
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

exports.addOrUpdateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ message: 'Reservation not found' });
    }
    if (reservation.status !== 'completed') {
      /*************  ✨ Codeium Command 🌟  *************/
      return res.status(400).json({
        message:
          'Only completed reservations can be reviewed',
      });
    }

    reservation.review = { rating, comment };
    await reservation.save();

    res.status(200).json({
      message: 'Review added/updated successfully!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding/updating review',
      error: error.message,
    });
  }
};
async function generateInvoice(data) {
  try {
    const response = await axios.post(
      'https://pdf-api.io/api/templates/508413018910861/pdf',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 2QmImsWty7DsrwMIWI5Xwy5TyliJnvvNdFSylfWN7934c579`,
        },
        responseType: 'arraybuffer',
      },
    );

    console.log('Invoice PDF generated successfully');

    return Buffer.from(response.data);
  } catch (error) {
    console.error(
      'Error generating invoice:',
      error.message,
    );
    throw new Error('Failed to generate invoice');
  }
}
