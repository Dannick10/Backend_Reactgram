const express = require("express")
const router = express.Router()

// controller
const {register, login, getCurrentUser, update} = require("../controllers/UserController")
// middlewares
const validate = require("../middlewares/handleValidator")
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/UserValidators")
const authGuard = require("../middlewares/AuthGuard")
const { imageUpload } = require("../middlewares/ImageUpload")

// Routes
router.post("/register",userCreateValidation(),validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard,getCurrentUser)
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)
module.exports = router