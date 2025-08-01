const Category = require("../../models/category.model");

module.exports.getSubCategory = async (id) => {
  const getCategory = async (parentId) => {
    const subs = await Category.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });

    let allSub = [...subs];

    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSub = allSub.concat(childs);
    }

    return allSub;
  };

  const result = await getCategory(id);

  return result;
};
