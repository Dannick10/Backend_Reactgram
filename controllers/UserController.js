const User = require("../models/User");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register user sign in
const register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  //check user exist
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ erros: ["por favor, utilize outro email"] });
    return;
  }

  if (password && password !== confirmpassword) {
    res.status(422).json({ erros: ["As senhas tem que ser a mesma"] });
  }

  // generate passwordHash

  const salt = await bycript.genSalt();
  const passwordHash = await bycript.hash(password, salt);

  // create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // if user created sucessfully, return the token

  if (!newUser) {
    res
      .status(422)
      .json({ erros: ["houve um erro, por favor tente mais tarde"] });
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check user exist
  if (!user) {
    res.status(404).json({ erros: ["Usuario não encontrado"] });
    return;
  }

  //check if password matchers
  if (!(await bycript.compare(password, user.password))) {
    res.status(422).json({ erros: ["senha invalida"] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  })

};


//get current logged in user 
const getCurrentUser = async(req,res) => {
  const user = req.user 

  res.status(200).json(user)
}

const update = async(req,res) => {
  res.send("update")
}

module.exports = {
  register,
  login,
  getCurrentUser,
  update
};
