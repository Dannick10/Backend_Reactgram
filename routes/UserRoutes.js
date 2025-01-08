const express = require("express")
const router = express.Router()

// controller
const {register} = require("../controllers/UserController")
// middlewares
const validate = require("../middlewares/handleValidator")
const {userCreateValidation} = require("../middlewares/UserValidators")
// Routes
router.post("/register",userCreateValidation(),validate, register)

module.exports = router