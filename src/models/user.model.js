const mongoose = require("mongoose");
const randomString = require("../helpers/random");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    tokenUser: {
      type: String,
      default: randomString.randomString(20),
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt và updatedAt tự động
);

module.exports = mongoose.model("User", userSchema, "users");