const express = require("express")
const router = express.router()


//controller


//middlewares
const { photoInsertValidation} = require("../middlewares/photoValidator")
const authGuard = require("../middlewares/AuthGuard")
const validate = require("../middlewares/handleValidator")

//routes


module.exports = router