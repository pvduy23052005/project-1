const cloudinary = require("../../middlewares/cloudinary");

module.exports.uploadCloud = async (images) => {
  let imageUrls = [];
  if (images) {
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });
      imageUrls.push(result.secure_url);
    }
  }

  return imageUrls;
};
