const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({
      status: "Failed",
      message: "All fields are required",
    });
  }

  const isEmailExists = await user.findOne({ email });
  if (isEmailExists) {
    return res.status(400).send({
      status: "Failed",
      message: "email already exist",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new user({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.send({
      status:"Success",
      message:"User Created Successfully"
    })
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "Error in user Registration",
    });
    console.log("Error from userRegistration:", error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).send({
      status: "Failed",
      message: "All fields are required",
    });
  }
  try {
    const isEmailExists = await user.findOne({ email });
    if (!isEmailExists) {
      return res.status(500).send({
        status: "Failed",
        message: "user does not exist",
      });
    }
    const decryptPassword = bcrypt.compare(password, isEmailExists.password);
    if (!decryptPassword) {
      return res.status(500).send({
        status: "Failed",
        message: "Wrong password!",
      });
    } else {
      const token = jwt.sign(
        { userId: isEmailExists._id },
        process.env.SECRET_KEY
      );
      res.send({
        status: "Successfully loggedin",
        token,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Error in user login",
    });
    console.log("Error in login: ", error);
  }
};

module.exports = { registerUser, loginUser };
