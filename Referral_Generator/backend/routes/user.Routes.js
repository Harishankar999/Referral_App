const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
require("dotenv").config();

const userManage = express.Router();

userManage.post("/register", (req, res) => {
  const { name, mobile, password, referral, refer_By } = req.body;
  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      return res.send("please try again");
    }
    const user = new UserModel({
      name,
      mobile,
      password: hash,
      refer_By,
      referral,
    });
    await user.save();
    return res.send("Sign up is successfull");
  });
});

userManage.post("/login", async (req, res) => {
  const { mobile, password } = req.body;
  const user = await UserModel.findOne({ mobile: mobile });
  if (!user) {
    return res.send("Invalid Credential");
  }
  const hash_password = user.password;
  const user_id = user._id;
  const referral = user.referral;
  bcrypt.compare(password, hash_password, function (err, result) {
    // console.log(result);
    if (result) {
      let token = jwt.sign({ mobile, user_id }, process.env.SECRET_KEY);
      return res.send({
        message: "Login Successfull",
        token: token,
        referralCode: referral,
        id: user_id,
      });
    } else {
      return res.send("Invalid Credential");
    }
  });
});

module.exports = userManage;
