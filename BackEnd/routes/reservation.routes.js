const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.get(
  '/user',
  reservationController.getUserReservations,
);

router.get(
  '/court/:courtId',
  reservationController.getCourtReservations,
);

router.post('/', reservationController.addReservation);

router.patch(
  '/:id/cancel',
  reservationController.cancelReservation,
);

// TODO: Delete a reservation (admin only - placeholder)
router.delete(
  '/:id',
  reservationController.deleteReservation,
);

router.get(
  '/search',
  reservationController.searchReservations,
);

module.exports = router;
