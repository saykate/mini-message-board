const express = require('express');
const router = express.Router();
const messages = require('../controllers/messageController')

//GET messages page
//Exposing data via Api
router.get('/', messages.list);

module.exports = router;
