const express = require('express');
const router = express.Router();
const {
  deleteUser,
  getAllUsers,
} = require('../controllers/admin.users.controller');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminAuthMiddleware');

router.delete(
  '/:email',
  authMiddleware,
  adminMiddleware,
  deleteUser,
);

router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  getAllUsers,
);

module.exports = router;
