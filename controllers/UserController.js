const User = require("../models/User")
const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

// generate user token 
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    })
}

// Register user sign in 
const register = async(req,res) => {
    res.send("registro")
}

module.exports = {
    register,
}