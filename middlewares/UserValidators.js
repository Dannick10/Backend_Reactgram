const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("o nome precisa ter no minimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("O email é obrigatorio")
      .isEmail()
      .withMessage("Insiira um email valido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no minimo 5 caracteres."),
    body("confirmpassword")
      .isString()
      .withMessage("A confiramção de senha é obrigatoria")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true
      }),
  ];
};


const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O email é obrigatório")
            .isEmail()
            .withMessage("Insira um email válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
    ]
}


const userUpdateValidation = () => {

  return [
    body("name")
     .optional()
     .isLength({min: 3})
     .withMessage("O nome precisa ser pelo menos 3 caracteres"),
    body("password")
      .optional()
      .isLength({min: 5})
      .withMessage("A senha precisa ter no minimo 5 caracteres")
  ]
}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation
};
