const express = require("express")
const router = express.Router()
const { getUser, getUserById } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth')

router.param('userId',getUserById)
// get user
router.get('/user/:userId',isSignedIn,isAuthenticated,getUser)

module.exports = router