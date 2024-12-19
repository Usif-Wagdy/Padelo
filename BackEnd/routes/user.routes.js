const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.addUser);
router.post('/login', authController.login);
router.post(
  '/forget-password',
  authController.forgetPassword,
);
router.patch(
  '/reset-password/:token',
  authController.ResetPassword,
);

router.put(
  '/add-image',
  authMiddleware,
  userController.addImage,
);
router.put(
  '/add-phone-number',
  authMiddleware,
  userController.addPhoneNumber,
);
router.put(
  '/change-name',
  authMiddleware,
  userController.updateName,
);
router.put(
  '/change-email',
  authMiddleware,
  userController.updateEmail,
);

module.exports = router;
