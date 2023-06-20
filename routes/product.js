const router = require('express').Router()
const {getUserById} = require('../controllers/user')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {getProd, getProdById, createProd, updateProd, deleteProd} = require('../controllers/product')

router.param('prodId',getProdById)
router.get('/product/:prodId',getProd)

router.param('userId',getUserById)
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProd)
router.put('/product/update/:userId/:prodId',isSignedIn,isAuthenticated,isAdmin,updateProd)
router.delete('/product/delete/:userId/:prodId',isSignedIn,isAuthenticated,isAdmin,deleteProd)

module.exports = router