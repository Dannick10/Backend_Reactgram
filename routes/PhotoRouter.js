const express = require("express");
const router = express.Router();

//controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  upddatePhoto,
  likePhoto,
} = require("../controllers/photosController");

//middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
} = require("../middlewares/photoValidator");
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/handleValidator");
const { imageUpload } = require("../middlewares/ImageUpload");
//routes

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, upddatePhoto);
router.put("/like/:id", authGuard, likePhoto)

module.exports = router;
