const mongoose = require("mongoose");
const randomString = require("../helpers/random");

const accountSchema = new mongoose.Schema(
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
      required: randomString.randomString(20),
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    role_id: {
      type: String,
      ref: "Role",
      required: true,
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

module.exports = mongoose.model("Account", accountSchema, "accounts");
