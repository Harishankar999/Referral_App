const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  mobile: { type: Number, require: true },
  password: { type: String, require: true },
  refer_By: String,
  referral: { type: String, default: Math.random().toString(36).slice(-7) },
});

const UserModel = new mongoose.model("customer", userSchema);

module.exports = UserModel;
