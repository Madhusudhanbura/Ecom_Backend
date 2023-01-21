const express = require('express');
const User = require('../models/user');

function signup(req,res){
    const user1 = new User(req.body)
    user1.save((err,user1) => {
        if(err){
            return res.json({"error" : " bhai err aya hai dekhle"})
        }
        user1.salt = undefined
        user1.encrypted_password = undefined
        return res.json(user1)
    })
}

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
            user.salt = undefined
            user.encrypted_password = undefined
            return res.json(user)
        }
    })
}

module.exports = { signup, signin }