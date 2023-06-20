const router = require('express').Router()
const { isAdmin,isAuthenticated, isSignedIn } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')
const { createCategory, getCategoryById, getCategory, updateCategory, deleteCategory} = require('../controllers/category')

router.param('userId',getUserById)
router.param('categoryId',getCategoryById)

router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get('/category/get/:categoryId',getCategory)
router.put('/category/update/:userId/:categoryId',isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete('/category/delete/:userId/:categoryId',isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports = router