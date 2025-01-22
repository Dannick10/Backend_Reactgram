const express = require("express")
const router = express.Router()


//controller
const {insertPhoto, deletePhoto, getAllPhotos } = require("../controllers/photosController")

//middlewares
const { photoInsertValidation} = require("../middlewares/photoValidator")
const authGuard = require("../middlewares/AuthGuard")
const validate = require("../middlewares/handleValidator")
const { imageUpload } = require("../middlewares/ImageUpload")
//routes

router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)

module.exports = router