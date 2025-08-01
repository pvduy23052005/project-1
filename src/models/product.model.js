const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // tuy chỉnh khoảng trắng ở đầu và cuối
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    featured : {
      type : String , 
      default : "1"
    },
    slug: {
      type: String,
      slug: "title", // Tạo slug từ trường `title`
      unique: true, // Không trùng
      slugPaddingSize: 4, // Thêm số nếu trùng (ví dụ: san-pham-0001)
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
    },
    position: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createBy: {
      account_id: String,
      create: {
        type: Date,
        default: Date.now(),
      },
    },
    deletedBy: {
      account_id: String,
      deleteTime: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updateTime: Date,
      },
    ],
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

mongoose.plugin(slug);
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
