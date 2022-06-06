const Subject = require("../models/subjectModel");
const User = require("../models/userModel");
const subjectController = {
  addSubject: async (req, res, next) => {
    try {
      const teacher = await User.findOne({ Id_User: req.body.teacher });
      const data = { ...req.body };
      data.teacher = teacher._id;
      const newSubject = new Subject(data);
      const saveSubject = await newSubject.save();
      res.status(200).json({
        status: "success",
        message: "Thêm môn học thành công",
        data: { saveSubject },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Thêm môn học thất bại",
      });
    }
  },
  updateSubject: async (req, res, next) => {
    try {
      let subject = await Subject.findOne({ Id_Subject: req.params.id });
      const data = { ...req.body };
      if (req.body.teacher) {
        const teacher = await User.findOne({ Id_User: req.body.teacher });
        data.teacher = teacher._id;
      }
      if (req.body.credit && req.body.coefficient) {
        data.money = (
          parseFloat(req.body.credit) *
          parseFloat(req.body.coefficient) *
          400
        ).toFixed();
      }
      subject = await Subject.findOneAndUpdate(
        { Id_Subject: req.params.id },
        data,
        {
          new: true,
          runValidators: true,
        }
      );
      // await subject.updateOne({ $set: data });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { subject },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Cập nhật học thất bại",
        // data: { newUser },
      });
      // res.status(404).json(error);
    }
  },
  getSubject: async (req, res, next) => {
    try {
      const subject = await Subject.findOne({ Id_Subject: req.params.id })
        .populate({
          path: "teacher",
          select: "name Id_User photo",
        })
        .populate({
          path: "students",
          select: "name Id_User photo",
        });
      if (subject) {
        res.status(200).json({
          status: "success",
          data: {
            subject,
          },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "ID ko tồn tại",
        });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getAllSubject: async (req, res, next) => {
    try {
      const queryObj = { ...req.query };

      const subjects = await Subject.find(queryObj)
        .populate({
          path: "teacher",
          select: "name Id_User",
        })
        .populate({
          path: "students",
          select: "name Id_User photo",
        });

      res.status(200).json({
        status: "success",
        results: subjects.length,
        data: {
          subjects,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  deleteSubject: async (req, res) => {
    try {
      await Subject.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getTeacherSubject: async (req, res) => {
    try {
      const teacher = await User.findOne({ Id_User: req.params.id });
      const subjects = await Subject.find({ teacher: teacher._id });
      res.status(200).json({
        status: "success",
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMySubject: async (req, res) => {
    try {
      // const teacher = await User.findOne({ Id_User: req.params.id });
      const subjects = await Subject.find({ teacher: req.user.id }).populate({
        path: "students",
        select: "name Id_User photo",
      });
      res.status(200).json({
        status: "success",
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = subjectController;
