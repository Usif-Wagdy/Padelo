const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkVerified = require('../middleware/verifiedMiddleware');

router.post('/register', authController.addUser);
router.post('/verify_email', authController.verifyEmail);

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
  checkVerified,
  userController.addImage,
);
router.put(
  '/add-phone-number',
  authMiddleware,
  checkVerified,
  userController.addPhoneNumber,
);
router.put(
  '/change-name',
  authMiddleware,
  checkVerified,
  userController.updateName,
);
router.put(
  '/change-email',
  authMiddleware,
  checkVerified,
  userController.updateEmail,
);

module.exports = router;
