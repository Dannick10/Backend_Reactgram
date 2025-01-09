const express = require("express")
const router = express.Router()

// controller
const {register, login, getCurrentUser} = require("../controllers/UserController")
// middlewares
const validate = require("../middlewares/handleValidator")
const {userCreateValidation, loginValidation} = require("../middlewares/UserValidators")
const authGuard = require("../middlewares/AuthGuard")
// Routes
router.post("/register",userCreateValidation(),validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard,getCurrentUser)

module.exports = router