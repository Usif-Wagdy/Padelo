const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkVerified = require('../middleware/verifiedMiddleware');
const { upload } = require('../config/cloudinaryConfig');
router.post('/register', authController.addUser);
router.post('/verify_email', authController.verifyEmail);
router.post(
  '/resend_verification',
  authController.resendVerificationCode,
);
router.post("/checkAuth", authMiddleware, userController.checkAuth);
router.post('/login', authController.login);
router.post(
  '/forget-password',
  authController.forgetPassword,
);
router.patch(
  '/reset-password/:token',
  authController.ResetPassword,
);

router.patch(
  '/update-image/:id',
  upload.single('photo'),
  userController.addImage,
);
router.patch("/updateUser", authMiddleware, userController.updateUser);
module.exports = router;
