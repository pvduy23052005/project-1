module.exports.validateCreateProduct = (req, res, next) => {
  const { title } = req.body;

  if (!title ) {
    req.flash("warning", "Vui lòng điền đầy đủ thông tin");
    return res.redirect(req.get("Referer"));
  }

  next();
};
