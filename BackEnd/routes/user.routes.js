const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.addUser);

router.post('/login', authController.login);
router.post(
  '/forgetPassword',
  authController.forgetPassword,
);
router.patch(
  '/ResetPass/:token',
  authController.ResetPassword,
);
router.put('/add-image', userController.addImage);

router.put(
  '/add-phone-number',
  userController.addPhoneNumber,
);

module.exports = router;
