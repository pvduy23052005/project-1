// [get] /admin/auth/login
module.exports.index = async (req, res) => {
  res.render("admin/pages/auth/index" , {
    title : "Đăng nhập "
  })
};
