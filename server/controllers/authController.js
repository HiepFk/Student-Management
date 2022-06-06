const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");

// Tạo Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res, msg) => {
  const token = signToken(user._id);

  // Gửi cookie
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers["x-forwarded-proto"] == "https",
    // sameSite: "none",
  });
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: msg,
    token,
    data: { user },
  });
};

exports.login = async (req, res, next) => {
  try {
    const { Id_User, password } = req.body;

    if (!Id_User || !password) {
      res.status(400).json({
        status: "error",
        message: "Please provie ID and Password",
      });
      return;
    }

    const user = await User.findOne({ Id_User }).select("+password");

    if (!user) {
      res.status(401).json({
        status: "error",
        message: "Incorrect ID",
      });
      return;
    }

    if (!(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "error",
        message: "Incorrect Password",
      });
      return;
    }

    createSendToken(user, 200, req, res, (msg = "Login success"));
  } catch (error) {
    res.status(404).json(error);
  }
};

// Đăng suất , thay đổi token đăng nhập sau 10s
exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
    // secure: req.secure || req.headers["x-forwarded-proto"] == "https",
    // sameSite: "none",
  });
  res.status(200).json({ status: "success", message: "You are loggedout" });
};

// Kiểm tra quyền của User
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action",
      });
      return;
    }
    next();
  };
};

// Kiểm tra người dùng đã đăng nhập hay chưa
exports.protect = async (req, res, next) => {
  try {
    // Kiểm tra token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access",
      });
      return;
    }

    // Kiểm tra tính xác thực của id
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // Kiểm tra user có tồn tại ko
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.status(401).json({
        status: "The user beloging to this token does not longer exist",
      });
      return;
    }

    // Kiểm tra pass đã đc thay đổi ở chỗ khác chưa
    if (currentUser.changesPasswordAfter(decoded.iat)) {
      res.status(401).json({
        status: "User has changed password after! Please login again",
      });
      return;
    }

    // Được phép truy cập các route protect
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

// Render page , no error
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.changesPasswordAfter(decoded.iat)) {
        return next();
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// Thay đổi password , cái này cho user
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      res.status(401).json({
        status: "error",
        message: "Mật khẩu hiện tại không đúng",
      });
      return;
    }

    // Cập nhập mật khẩu
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // Đăng nhập và tạo token mới
    createSendToken(
      user,
      200,
      req,
      res,
      (msg = "Cập nhật mật khẩu thành công")
    );
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: `${error.errors.passwordConfirm.message}`,
    });
  }
};
