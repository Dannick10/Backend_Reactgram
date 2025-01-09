const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;


const authGuard = async(req, res, next) => {

    const authHeader = req.header("authorization")
    const token = authHeader && authHeader.split(" ")[1]

    //check if header has a token 

    if(!token) return res.status(401).json({erros: ["acesso negado"]})
        console.log(token)
    // check if token is validd 

    try {
        const verify = jwt.verify(token, jwtSecret)
        req.user = await User.findById(verify.id).select("-password")
       next()
    }catch (err) {
        res.status(401).json({erros: ["token invalido."]})
    }
    
}


module.exports = authGuard