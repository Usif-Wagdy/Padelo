const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinaryConfig');
const {
  addCourt,
  updateCourt,
  deleteCourt,
} = require('../controllers/admin.courts.controller');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/', authMiddleware, adminMiddleware, addCourt);

router
  .route('/:id')
  .patch(
    authMiddleware,
    adminMiddleware,
    upload.single('photo'),
    updateCourt,
  )
  .delete(authMiddleware, adminMiddleware, deleteCourt);

module.exports = router;
