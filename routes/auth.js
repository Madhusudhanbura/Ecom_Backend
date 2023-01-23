const express = require('express')
const router = express.Router();
const { signup, signin, signOut } = require('../controllers/auth')

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signOut',signOut)

module.exports = router;