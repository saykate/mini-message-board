const express = require('express');
const router = express.Router();
const users = require('../controllers/userController')

//GET users page
//Exposing data via Api
router.get('/', users.list);

module.exports = router;