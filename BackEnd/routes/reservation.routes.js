const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
// const adminAuth = require('../middlewares/admin.auth'); // Your middleware file

router.get(
  '/user/:user',
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

router.patch(
  '/:id/complete',
  reservationController.completeReservation,
);

router.delete(
  '/:id',
  reservationController.deleteReservation,
);
// router.delete('/:id', adminAuth, reservationController.deleteReservation);

router.get(
  '/search',
  reservationController.searchReservations,
);

module.exports = router;
