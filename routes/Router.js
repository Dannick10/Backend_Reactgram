const express = require("express")
const router = express()

const userRouter = require("./UserRoutes")

router.use("/api/users",userRouter)

router.get("/", (req,res) => {
    res.send("API WORKING")
})

module.exports = router