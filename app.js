require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");


const port = process.env.port;

const app = express()


//config JSON and FORM DATA response 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({Credential: true, origin: "*"}))

//routes

//upload directory
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

//DB CONNECTION
require("./config/db.js").connectDB()

const router = require("./routes/Router");
const exp = require("constants");
app.use(router)

app.listen(port, () => {
    console.log("app rodando na porta " + port)
})