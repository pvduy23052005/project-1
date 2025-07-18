const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail:{
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    position: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    parent_id: {
      type: String, // liên kết tới Category hoặc Product khác
      default: null,
    },
    slug: {
      type: String,
      slug: "title", // Tạo slug từ trường `title`
      unique: true, // Không trùng
      slugPaddingSize: 4,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

mongoose.plugin(slug);
const Category = mongoose.model(
  "Category",
  categorySchema,
  "products-category"
);
module.exports = Category;
