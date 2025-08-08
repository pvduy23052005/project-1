const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    websiteName : String , 
    logo : String , 
    phone : String , 
    email : String , 
    address : String, 
    copyRight : String 
  },
  { timestamps: true } // createdAt và updatedAt tự động
);

module.exports = mongoose.model("Setting", settingSchema, "settings");
