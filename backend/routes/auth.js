const router = require('express').Router()
const auth = require('../controllers/authController')
const verifyBody = require('../middleware/verifyBody')

router.post("/login", verifyBody, auth.handleLogin)
router.post("/register", verifyBody, auth.handleRegister)

module.exports = router