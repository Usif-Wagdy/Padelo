const express = require('express');
const router = express.Router();
const {
  addCourt,
  updateCourt,
  deleteCourt,
} = require('../controllers/admin.courts.controller');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminAuthMiddleware');


// This file contains admin routes for managing courts
// POST / - Add a new court (requires auth & admin)
// PATCH /:id - Update existing court by ID (requires auth & admin) 
// DELETE /:id - Delete court by ID (requires auth & admin)
router.post('/', authMiddleware, adminMiddleware, addCourt);

router
  .route('/:id')
  .patch(authMiddleware, adminMiddleware, updateCourt)
  .delete(authMiddleware, adminMiddleware, deleteCourt);

module.exports = router;
