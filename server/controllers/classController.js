const Class = require("../models/classModel");
const User = require("../models/userModel");

const classController = {
  addClass: async (req, res) => {
    try {
      const teacher = await User.findOne({ Id_User: req.body.teacher });
      const newClass = new Class({
        name: req.body.name,
        teacher: teacher._id,
      });
      const saveClass = await newClass.save();

      res.status(200).json({
        status: "success",
        message: "Thêm lớp thành công",
        data: { saveClass },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Thêm lớp thất bại",
        // data: { newUser },
      });
      // res.status(404).json(error);
    }
  },
  updateClass: async (req, res) => {
    try {
      // const classs = await Class.findById(req.params.id);
      const data = { ...req.body };
      if (req.body.teacher) {
        const teacher = await User.findOne({ Id_User: req.body.teacher });
        data.teacher = teacher._id;
      }
      thatClass = await Class.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      })
        .populate({
          path: "teacher",
          select: "name Id_User photo",
        })
        .populate({
          path: "students",
          select: "name Id_User photo",
        });

      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { thatClass },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Cập nhật lớp thất bại",
        // data: { newUser },
      });
      // res.status(404).json(error);
    }
  },
  getClass: async (req, res) => {
    try {
      const thatClass = await Class.findOne({ name: req.params.id })
        .populate({
          path: "teacher",
          select: "name Id_User photo",
        })
        .populate({
          path: "students",
          select: "name Id_User photo",
        });
      if (thatClass) {
        res.status(200).json({
          status: "success",
          data: {
            thatClass,
          },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Không có lớp này với mã ID bạn nhập",
        });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getAllClass: async (req, res) => {
    try {
      const queryObj = { ...req.query };

      const classes = await Class.find(queryObj).populate({
        path: "teacher",
        select: "name Id_User",
      });
      res.status(200).json({
        status: "success",
        results: classes.length,
        data: {
          classes,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  deleteClass: async (req, res) => {
    try {
      await Class.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getTeacherClass: async (req, res) => {
    try {
      const teacher = await User.findOne({ Id_User: req.params.id });
      const classes = await Class.find({ teacher: teacher._id }).populate({
        path: "students",
        select: "name Id_User photo",
      });
      res.status(200).json({
        status: "success",
        data: { classes },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMyClass: async (req, res) => {
    try {
      const classes = await Class.find({ teacher: req.user.id }).populate({
        path: "students",
        select: "name Id_User photo",
      });
      res.status(200).json({
        status: "success",
        data: { classes },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = classController;
