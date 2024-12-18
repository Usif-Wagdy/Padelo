const express = require('express');
const router = express.Router();
const courtController = require('../controllers/court.controller');

router.get('/', courtController.getCourts);

router.get('/search', courtController.searchCourts);

router.get('/:id', courtController.getCourtById);

module.exports = router;
