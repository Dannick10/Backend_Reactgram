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

//remoe a photo 
const deletePhoto = async(req, res) => {

    const {id} = req.params 
    
    const reqUser = req.user 
    
    try{

        const photo = await Photo.findById(id)
        console.log(photo)
        console.log(id)
        
        if(!photo) {
            res.status(404).json({erros: ["foto não encontrada"]})
            return 
        }
        
        //check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)) {
            res.status(422).json({erros: "tente novamente mais tarde"})
            return 
        }
        
        
        await photo.deleteOne(photo._id)
        
        res.status(200).json({id: photo._id, message: "foto excluida com sucesso"})
        
    } catch(err) {
        res.status(404).json({erros: "error" + err})
    }
        
}

// get all photos


const getAllPhotos = async(req,res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(202).json(photos)

}


// get user photos

const getUserPhotos = async(req,res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()    
    
    return res.status(200).json(photos)

}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos
}