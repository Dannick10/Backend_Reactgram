const Photo = require("../models/Photo")
const User = require("../models/User")
const mongoose = require("mongoose")

// insert a photo, with and an user related to it 
const insertPhoto = async(req,res) => {
    const {title} = req.body 
    const image = req.file.filename 

    const reqUser = req.user 

    const user = await User.findById(reqUser._id)

    //create 

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })


    // if photo was created sucessfuly, return data
    if(!newPhoto) {
        return res.status(422).json({
            erros: ["Houve um problema, por favor tente novamente mais tarde. "]
        })
    }

    res.status(201).json(newPhoto)
}

module.exports = {
    insertPhoto
}