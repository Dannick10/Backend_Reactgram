const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 8081;

const app = express()


//config JSON and FORM DATA response 

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, () => {
    console.log("app rodando na porta " + port)
})