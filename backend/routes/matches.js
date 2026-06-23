const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getUpcomingMatches);
router.get('/:id', matchController.getMatchDetails);

module.exports = router;
