const express = require('express');
const router = express.Router();
const users = require('../controllers/userController')

//GET users page
//Exposing data via Api
router.get('/', users.list);

router.get('/:_id', users.user)

router.post('/', users.newUser)

module.exports = router;