// [get] /setting/general
module.exports.index = async (req, res) => {
  res.render("admin/pages/setting/index" , {
    title : "Setting"
  })
};
