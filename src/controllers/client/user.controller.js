const User = require("../../models/user.model");
const md5 = require("md5");
const random = require("../../helpers/random");
const ForgetPassword = require("../../models/forget-password.model");
const sendMailHelper = require("../../helpers/client/sendEmail");
const Cart = require("../../models/cart.model");

// [get] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    title: "Sign up",
  });
};

// [post] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const userInfo = req.body;
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      req.flash("error", "This email is already registered.");
      res.redirect("/user/register");
    } else {
      userInfo.password = md5(userInfo.password);
      const newUser = new User(userInfo);
      await newUser.save();
      res.cookie("tokenUser", user.tokenUser);
      res.redirect("/");
    }
  } catch (error) {
    req.flash("error", "Register not successful !");
    res.redirect("/user/login");
  }
};

// [get] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/login", {
    title: "Login",
  });
};

// [post] /user/login
module.exports.loginPost = async (req, res) => {
  const userInfo = req.body;
  const user = await User.findOne({
    email: userInfo.email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email does not exist.");
    res.locals.userLogin = userInfo.email;
    res.redirect("/user/login");
    return;
  }

  if (user.password !== md5(userInfo.password)) {
    req.flash("error", "Incorrect password!");
    res.redirect("/user/login");
    return;
  }

  const cart = await Cart.findOne({
    user_id: user.id,
  });

  // new gio hang chua co .
  if (cart) {
    res.cookie("cartId", cart.id);
  } else {
    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
      },
      {
        user_id: user.id,
      }
    );
  }

  res.cookie("tokenUser", user.tokenUser);
  req.flash("success", "Thanh cong!");
  res.redirect("/");
};

// [post] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  res.redirect("/");
};

// [get] /user/password/forget.
module.exports.forgetPassword = async (req, res) => {
  res.render("client/pages/user/forget-password", {
    title: "forget password",
  });
};

// [post] /user/password/forget.
module.exports.forgetPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    req.flash("error", "Email does not exist");
    res.redirect("/user/password/forget");
    return;
  }
  const otp = random.randomNumber(4);
  const objectForget = {
    email: email,
    otp: otp,
  };
  const forgetPassword = new ForgetPassword(objectForget);
  await forgetPassword.save();

  // gui mail .
  const subject = "Sac thuc OTP ";
  const html = `
    Ma OTP : <b> ${otp} </b>
  `;

  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};

// [get] /user/password/otp?email
module.exports.otp = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    title: "Otp-password",
    email: email,
  });
};

// [post] /user/password/otp.
module.exports.otpPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const checkOtp = await ForgetPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!checkOtp) {
    req.flash("error", "This otp does not exist");
    res.redirect(`/user/password/otp?email=${email}`);
    return;
  }

  // lay thong thin user de chen token vao cookie .
  const user = await User.findOne({
    email: email,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

// [get] /user/password/reset
module.exports.reset = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    title: "Reset-password",
  });
};

// [post] /user/password/reset
module.exports.resetPost = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const tokenUser = req.cookies.tokenUser;

  if (password != confirmPassword) {
    req.flash("error", "Mat khau khong khop ");
    return;
  }

  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );

  res.redirect("/");
};
