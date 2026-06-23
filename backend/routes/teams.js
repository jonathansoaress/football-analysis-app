const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/:id', teamController.getTeamData);

module.exports = router;
