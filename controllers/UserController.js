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
   
    const {name, email, password, confirmpassword} = req.body 

    //check user exist
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({erros: ["por favor, utilize outro email"]})
        return 
    }

    if(password && password !== confirmpassword) {
        res.status(422).json({erros: ["As senhas tem que ser a mesma"]})
    }

    // generate passwordHash 

    const salt = await bycript.genSalt()
    const passwordHash = await bycript.hash(password, salt)

    // create user 
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // if user created sucessfully, return the token  

    if(!newUser) {
        res.status(422).json({erros: ["houve um erro, por favor tente mais tarde"]})
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

}

module.exports = {
    register,
}