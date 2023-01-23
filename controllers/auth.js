const User = require('../models/user');
const jwt = require('jsonwebtoken')
var exjwt = require('express-jwt')

function signup(req,res){
    const user1 = new User(req.body)
    user1.save((err,user1) => {
        if(err){
            return res.send(err);
        }
        user1.salt = undefined
        user1.encrypted_password = undefined
        const mail = user1.email;
        return res.json(user1)
    })
};

function signin(req,res){
    const email = req.body.email
    const password = req.body.password
    User.findOne({email},(err,user) => {
        if(err){
            return res.json({"error" : " bhai err aya hai dekhle"})
        }
        if(!user.authenticate(password)){
            return res.json({"error" : "password barabr daalle bhai"})
        }
        else{
            const token = jwt.sign(
                {_id : user._id},
                process.env.TOKEN_KEY,
            )
            res.cookie("authToken",token,{expiresIn : new Date()+9999})
            user.salt = undefined
            user.encrypted_password = undefined
            return res.json(user)
        }
    })
};

function signOut(req,res){
    res.clearCookie("authToken")
    return res.json({"done": "signed out"})
};

// custom middlewares
const isSignedIn = exjwt.expressjwt({
    secret : "Mskjsdchsdgbchbvdsahcvhv",
    algorithms : ["HS256"],
    userProperty : "auth"
})

function isAuthenticated(req,res,next){
    if(!(req.profile && req.auth && (req.profile._id == req.auth._id))){
        return res.json({"error" : "access denied"});
    }
    next()
}

function isAdmin(req,res,next){
    if(!(req.profile && req.auth && req.profile.role > 0)){
        return res.json({"access error" : "only higher officials allowed"});
    }
    next()
}


module.exports = { signup, signin, signOut, isSignedIn, isAuthenticated, isAdmin }