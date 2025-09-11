const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: String,
    avartar: String,
    user_id: String,
    typeRoom: String, // single , group
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    members: [
      {
        user_id: String,
        role: String, // admin , member
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;
