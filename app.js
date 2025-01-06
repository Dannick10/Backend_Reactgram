require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");


const port = process.env.port;

const app = express()


//config JSON and FORM DATA response 

app.use(express.json())

app.use(express.urlencoded({extended: false}))

//routes

const router = require("./routes/Router")
app.use(router)

app.listen(port, () => {
    console.log("app rodando na porta " + port)
})