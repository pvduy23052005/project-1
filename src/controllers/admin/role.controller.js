const Role = require("../../models/roles.model"); 

// [get] /admin/role
module.exports.index =  async (req, res) =>{

  let find = { 
    deleted : false , 
  }

  const roles =  await Role.find(find); 

  console.log(roles);

  res.render("admin/pages/role",{
    title : "role" , 
    roles : roles
  })
}
