const mongoose = require("mongoose");

const forgetPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 180 * 1000), 
      expires: 0, 
    },
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
