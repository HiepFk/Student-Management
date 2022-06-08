const multer = require("multer");
const cloudinary = require("./../utils/cloudinary");

const User = require("../models/userModel");
const ClassDB = require("../models/classModel");
const Transcript = require("../models/transcriptModel");

const filterObj = (obj, ...notallowed) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!notallowed.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const userController = {
  uploadPhoto: upload.single("photo"),
  proPhoto: async (req, res, next) => {
    if (!req.body.photo) return next();
    const result = await cloudinary.uploader.upload(req.body.photo, {
      resource_type: "auto",
    });
    let userCurrent = "";
    if (req.params.id) {
      userCurrent = await User.findById(req.params.id);
    } else {
      userCurrent = await User.findById(req.user.id);
    }
    if (userCurrent.cloudinary_id !== "default_ohcoqq") {
      await cloudinary.uploader.destroy(userCurrent.cloudinary_id);
    }
    await userCurrent.updateOne(
      { $set: { photo: result.secure_url, cloudinary_id: result.public_id } },
      {
        runValidators: true,
        new: true,
      }
    );
    next();
  },
  addUser: async (req, res) => {
    try {
      const data = { ...req.body };
      let class_ed = {};
      if (req.body.class) {
        class_ed = await ClassDB.findOne({ name: req.body.class });
        data.class = class_ed._id;
      }
      if (req.body.teacher) {
        const teacher = await User.findOne({ Id_User: req.body.teacher });
        data.teacher = teacher._id;
      }
      const newUser = new User(data);
      const saveUser = await newUser.save();
      if (req.body.role === "student" || !req.body.role) {
        const newTranscript = new Transcript({ student: saveUser._id });
        await newTranscript.save();
      }
      if (req.body.class) {
        await class_ed.updateOne({ $push: { students: saveUser._id } });
      }
      res.status(200).json({
        status: "success",
        message: "Thêm người dùng thành công",
        data: { newUser },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Thêm người dùng thất bại",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      const data = { ...req.body };
      if (data.type === "password") {
        user.password = data.password;
        user.passwordConfirm = data.passwordConfirm;
        await user.save();
      } else {
        if (req.body.class) {
          await ClassDB.updateMany(
            { students: req.params.id },
            { $pull: { students: req.params.id } }
          );
          const class_ed = await ClassDB.findOne({ name: req.body.class });
          await class_ed.updateOne({ $push: { students: user._id } });
          data.class = class_ed._id;
        }
        if (req.body.teacher) {
          const teacher = await User.findOne({ Id_User: req.body.teacher });
          data.teacher = teacher._id;
        }
        if (data.photo) {
          delete data.photo;
        }
        user = await User.findByIdAndUpdate(req.params.id, data, {
          new: true,
          runValidators: true,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const query = User.find(queryObj);
      const users = await query;
      res.status(200).json({
        status: "success",
        results: users.length,
        data: { users },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ Id_User: req.params.id })
        .populate({
          path: "class",
          select: "name ",
        })
        .populate({
          path: "teacher",
          select: "name",
        });
      if (user) {
        res.status(200).json({
          status: "success",
          data: { user },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Không có người dùng",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateMe: async (req, res, next) => {
    try {
      if (req.body.password || req.body.passwordConfirm || req.body.role) {
        res.status(400).json({
          message: "This route is not allowed to be update passWord or Role!",
        });
        return;
      }

      const filterBody = filterObj(req.body, "role", "password", "photo");
      const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Cập nhật thất bại",
      });
    }
  },
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .populate({
          path: "class",
          select: "name ",
        })
        .populate({
          path: "teacher",
          select: "name",
        });
      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
