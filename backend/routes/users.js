const express = require('express');
const router = express.Router();
const users = require('../controllers/userController')

//GET users page
router.get('/', users.list);
router.get('/:_id', users.getUser)

module.exports = router;