const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/hash");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User doesn't exists!" });
    }
    return res.status(200).json({
      userID: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;
    if (!email) {
      return res.status(400).json({ error: "email is required!" });
    }
    if (!password) {
      return res.status(400).json({ error: "password is required!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exists!" });
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "incorrect password!" });
    }
    res.status(200).json({
      userID: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const register = async (req, res) => {
  try {
    const body = req.body;
    const { name, email, password, confirmPassword } = body;
    if (!name.trim()) {
      return res.status(400).json({ error: "Name is required!" });
    }
    if (!email) {
      return res.status(400).json({ error: "email is required!" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 8 characters long!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }
    const isExisting = await User.findOne({ email: email });
    if (isExisting) {
      return res.status(400).json({ error: "User already exixts!" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      userID: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  register,
  login,
  getUserById,
};
