const Category = require("../../models/category.model");

module.exports.categoryMiddleware = async (req , res , next) => {
  let find = {
    deleted : false 
  }
  const categories = await Category.find(find);
  
  res.locals.categoryMiddleware = categories;
  next();
} 