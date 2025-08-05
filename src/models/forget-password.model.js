const mongoose = require("mongoose");

const forgetPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type : Date , 
      expires : 180, // don vi (s)
      default : Date.now
    }
  },
  {
    timestamps: true,
  }
);

const ForgetPassword = mongoose.model(
  "forgetPassword",
  forgetPasswordSchema,
  "forget-passwords"
);

module.exports = ForgetPassword;
