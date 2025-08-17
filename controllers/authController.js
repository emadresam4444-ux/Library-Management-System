const userModel = require("../modules/user");
const httpStatusText = require("../utils/httpStatusText");
const { validationResult, body } = require("express-validator");
const asyncWrapper = require("../middlewares/asyncWrapper");

const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const error = new Error("user already exists");
    error.status = 400;
    return next(error);
  }
  const newUser = await userModel.create({
    username,
    email,
    password,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: newUser });
});
const login = asyncWrapper(async (req, res) => {});

module.exports = { login, register };
