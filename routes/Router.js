const express = require("express")
const router = express()

const userRouter = require("./UserRoutes")
const photoRouter = require("./PhotoRouter")

router.use("/api/users",userRouter)
router.use("/api/photos", photoRouter)

router.get("/", (req,res) => {
    res.send("API WORKING")
})

module.exports = router