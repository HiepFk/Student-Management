const SubjectEd = require("../models/subjectEdModel");
const Transcript = require("../models/transcriptModel");
const Subject = require("../models/subjectModel");
const User = require("../models/userModel");

const subjectEdController = {
  addSubjectEd: async (req, res, next) => {
    try {
      const newSubject = new SubjectEd(req.body);
      newSubject.student = req.user.id;
      const saveSubject = await newSubject.save();

      const subject = await Subject.findById(req.body.subject);
      await subject.updateOne({ $push: { students: req.user.id } });

      const transcript = await Transcript.findOne({
        student: req.user.id,
      });
      // await transcript.updateOne({ $push: { subjects: req.body.subject } });
      await transcript.updateOne({ $push: { subjects: saveSubject._id } });

      res.status(200).json({
        status: "success",
        message: "Đăng kí môn thành công",

        data: { saveSubject },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Đăng kí môn thất bại",
        // data: { newUser },
      });
      // res.status(404).json(error);
    }
  },
  updateSubjectEd: async (req, res, next) => {
    try {
      const data = { ...req.body };
      let subject = await SubjectEd.findById(req.params.id);
      const subjectEd = await Subject.findById(subject.subject);
      if (data.diem_CK) {
        if (data.diem_QT >= 7 && data.diem_QT <= data.diem_CK) {
          data.diem_TK = data.diem_CK;
        } else {
          data.diem_TK = data.diem_CK * 0.6 + data.diem_QT * 0.4;
        }
        data.type_thi = true;
      }

      if (data.diem_QT < 4) {
        data.diem_CK = 0;
        data.diem_TK = 0;
        data.tinChi = 0;
      }
      data.diem_TK >= 4 ? (data.tinChi = subjectEd.credit) : (data.tinChi = 0);

      subject = await SubjectEd.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        message: "Cập nhật điểm thành công",
        data: { subject },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Cập nhật điểm thất bại",
      });
    }
  },
  getSubjectEd: async (req, res, next) => {
    try {
      const subject = await SubjectEd.findById(req.params.id)
        .populate("student")
        .populate("subject");

      res.status(200).json({
        status: "success",
        data: {
          subject,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getAllSubjectEd: async (req, res, next) => {
    try {
      const queryObj = { ...req.query };

      const subject = await SubjectEd.find(queryObj)
        .populate({
          path: "student",
          select: "name Id_User",
        })
        .populate({
          path: "subject",
          select: "name ",
        });
      res.status(200).json({
        status: "success",
        results: subject.length,
        data: {
          subject,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  deleteSubjectEd: async (req, res) => {
    try {
      await Transcript.updateMany(
        { subjects: req.params.id },
        { $pull: { subjects: req.params.id } }
      );

      const subjectEd = await SubjectEd.findById(req.params.id);

      await Subject.findByIdAndUpdate(subjectEd.subject, {
        $pull: { students: subjectEd.student },
      });
      await SubjectEd.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Hủy môn thành công",
      });
    } catch (err) {
      res.status(404).json({
        status: "error",
        message: "Hủy môn thất bại",
      });
    }
  },
  // getStudentSubject: async (req, res) => {
  //   try {
  //     const student = await User.findOne({ Id_User: req.params.id });
  //     let subjects = await SubjectEd.find({ student: student._id }).populate({
  //       path: "subject",
  //       select: "name ",
  //     });
  //     res.status(200).json({
  //       status: "success",
  //       data: { subjects },
  //     });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
  getStudentSubject: async (req, res) => {
    try {
      const subject = await Subject.findOne({ Id_Subject: req.params.id });
      let subjects = await SubjectEd.find({
        subject: subject._id,
      }).populate({
        path: "student",
        select: "name Id_User",
      });
      res.status(200).json({
        status: "success",
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Những môn đã đk nhưng chưa thi
  getMySubject: async (req, res) => {
    try {
      let subjects = await SubjectEd.find({ student: req.user.id });
      subjects = subjects.filter((e) => e.type_thi === false);
      res.status(200).json({
        status: "success",
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Những môn muốn dk thi lại
  getMySubjectEd: async (req, res) => {
    try {
      const subjectEd = await SubjectEd.find({ student: req.user.id });
      const allSubject = await Subject.find();
      let subjects = subjectEd.filter((item) => {
        return allSubject.some((f) => {
          return item.subject._id.equals(f._id);
        });
      });

      subjects = subjects.filter((f) => {
        return f.type_thi === true;
      });
      res.status(200).json({
        status: "success",
        results: subjects.length,
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Những môn chưa học
  getNotMySubject: async (req, res) => {
    try {
      let allSubject = await Subject.find().populate({
        path: "teacher",
        select: "name Id_User",
      });
      let subjects = allSubject.filter((f) => {
        return !f.students.includes(req.user.id);
      });

      res.status(200).json({
        status: "success",
        results: subjects.length,
        data: { subjects },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  DKThiLai: async (req, res, next) => {
    try {
      const data = { ...req.body };
      if (data.diem_QT || data.diem_CK) {
        res.status(400).json({
          status: "This route is not allowed to be update point by student",
        });
        return;
      }

      const subject = await SubjectEd.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        message: "Đăng kí thành công",

        data: { subject },
      });
    } catch (error) {
      res.status(404).json({
        status: "erro",
        message: "Đăng kí thất bại",
      });
    }
  },
};

module.exports = subjectEdController;
