const {body} = require("express-validator")

const photoInsertValidation = () => {
    return [
        body("title")
        .not() 
        .equals("underfined")
        .withMessage("O Titulo é obrigatorio")
        .isString()
        .withMessage("O titulo é obrigatorio")
       .isLength({min: 3})
        .withMessage("O titulo precisa ter no mínimo 3 caracteres"),
        body("image").custom((value, { req}) => {
            if(!req.file) {
                throw new Error("A imagem é obrigatoria")
            }

            return true
        })
    ]
}

const photoUpdateValidation = () => {
    return [
        body("title")
        .optional()
        .isString()
        .withMessage("O titulo é obrigatorio")
        .isLength({min: 3})
        .withMessage("O titulo precisa ter no mínimo 3 caracteres"),
    ]
}

const commentValidation = () => {
    return [
        body("comments")
        .isString()
        .withMessage("Comentário é obrigatório")
        .isLength({min: 3})
        .withMessage("comentário precisa ter no mínimo 3 caracteres")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
}