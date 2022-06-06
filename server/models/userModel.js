const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowcase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/hieptlu/image/upload/v1642152478/default_ohcoqq.jpg",
  },
  cloudinary_id: {
    type: String,
    default: "default_ohcoqq",
  },
  cmnd: {
    type: String,
    default: "123456789",
  },
  number: {
    type: String,
    default: "0123456789",
  },
  birth: {
    type: String,
    default: "1/1/2001",
  },
  sex: {
    type: String,
    default: "Nam",
  },
  adress: {
    type: String,
    default: "Hà Nội",
  },
  group: {
    type: Number,
  },
  nganh: {
    type: String,
  },
  khoa: {
    type: String,
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    emum: [
      "student", // xem thông tin cá nhân , cập nhật , đk học , đk thi lại
      "teacher", // xem thông tin lớp chủ nhiệm , thông tin môn học mình dạy
      "admin", // all chức năng
      "phongCtsv", // quyền chỉnh sửa thông tin sinh viên
      "phongKhaoThi", // Quyền cập nhập điểm cho sinh viên
      "phongDaoTao", // Tạo lịch học , lịch thi, môn học
    ],
    default: "student",
  },
  Id_User: {
    type: String,
    required: [true, "Please tell us your id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please tell us your password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please tell us your password confrim"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Mật khẩu không giống nhau!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Làm cho thời gian hợp lý và thoả mái hơn
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Kiểm tra mật khẩu
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Kiểm tra người dùng đã thay đổi mật khẩu chưa
userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
