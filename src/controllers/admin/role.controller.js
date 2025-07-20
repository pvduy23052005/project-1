const Role = require("../../models/roles.model"); 

// [get] /admin/role
module.exports.index =  async (req, res) =>{

  let find = { 
    deleted : false , 
  }

  const roles =  await Role.find(find); 

  console.log(roles);

  res.render("admin/pages/role/index",{
    title : "role" , 
    roles : roles
  })
}

// [get] /admin/role/create 
module.exports.createGet = (req , res) => {
  res.render("admin/pages/role/create" , {
    title : "Thêm nhóm quyền"
  });
}

// [post] /admin/role/create 
module.exports.createPost = async (req , res) => {

  try{
    const newRole = new Role(req.body); 
    await newRole.save();
    req.flash("success" , "thanh vong")
  }catch(error){
    req.flash("error" , "that bai");
  }
  res.redirect("/admin/role");
}