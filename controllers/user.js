const User = require('../models/user')

function getUserById(req,res,next,userId){
    User.findById(userId,(err,user) => {
        if(err) return res.json({"err": "no user with given id"})
        req.profile = user
        next()
    })
}

function getUser(req,res){
    return res.json({"user": req.profile})
}
module.exports = { getUserById, getUser }