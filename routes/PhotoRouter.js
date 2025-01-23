const express = require("express")
const router = express.Router()


//controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById } = require("../controllers/photosController")

//middlewares
const { photoInsertValidation} = require("../middlewares/photoValidator")
const authGuard = require("../middlewares/AuthGuard")
const validate = require("../middlewares/handleValidator")
const { imageUpload } = require("../middlewares/ImageUpload")
//routes

router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)

module.exports = router