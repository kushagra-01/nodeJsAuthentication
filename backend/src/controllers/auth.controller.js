require("dotenv").config();
const jwt = require("jsonwebtoken");
const newToken = (user) => {
  return jwt.sign({ user }, "Nrupul");
};
const User = require("../models/Users.model");

const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("user already exist");
    user = await User.create(req.body);
    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found!");
    const match = user.check(req.body.password);
    if (!match) return res.send("wrong password!");
    const token = newToken(user);
    return res.status(200).send({
      message: "Logged in successfully",token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = { register, login };
