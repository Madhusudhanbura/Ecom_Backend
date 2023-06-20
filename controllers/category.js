const Category = require('../models/category')

function createCategory(req,res){
    const category = new Category(req.body)    
    category.save((err,category) => {
        if(err){
            return res.json({"err": "error in category creation"})
        }
        return res.json(category)
    })
}

function getCategory(req,res){
    return res.json(req.category)
}

function updateCategory(req,res){
    req.category.name = req.body.name
    req.category.save((err,updatedCategory) => {
        if(err){
            return res.json({"err": "error in category updation"})
        }
        return res.json(updatedCategory)
    })
}

function deleteCategory(req,res){
    req.category.remove((err,deletedCategory) => {
        if(err){
            return res.json({"err": "error in category deletion"})
        }
        return res.json(deletedCategory)
    })
}
// middleware
function getCategoryById(req,res,next,categoryId){
    Category.findById(categoryId,(err,category) => {
        if(err || !category){
            return res.json({"err": "error in category get"})
        }
        req.category = category
        next()
    })
}
module.exports = {createCategory, getCategory, getCategoryById, updateCategory, deleteCategory}