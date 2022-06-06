const Transcript = require("../models/transcriptModel");
const User = require("../models/userModel");

const transcriptController = {
  getAllTranscript: async (req, res, next) => {
    try {
      const users = await Transcript.find()
        .select("student Sum_TichLuy Tb_diem")
        .populate({
          path: "student",
          select: "name Id_User",
        });
      res.status(200).json({
        data: { users },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  addTranscript: async (req, res, next) => {
    try {
      const newTranscript = new Transcript(req.body);
      const saveTranscript = await newTranscript.save();
      res.status(200).json({
        data: saveTranscript,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  updateTranscript: async (req, res, next) => {
    try {
      const transcript = await Transcript.findById(req.params.id);
      await transcript.updateOne({ $set: req.body });
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getTranscript: async (req, res, next) => {
    try {
      const transcript = await Transcript.findById(req.params.id)
        .populate("student")
        .populate({
          path: "subject",
          select: "name ",
        });
      res.status(200).json({
        status: "success",
        data: {
          transcript,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getTranscriptStudent: async (req, res) => {
    try {
      const student = await User.findOne({ Id_User: req.params.id });
      let transcripts = await Transcript.find({
        student: student._id,
      })
        .populate({
          path: "subjects",
          select: " tinChi diem_TK type_thi  ",
        })
        .populate({
          path: "student",
          select: "name Id_User class",
        });
      transcripts[0].subjects = transcripts[0].subjects.filter(
        (item) => item.type_thi === true
      );
      res.status(200).json({
        status: "success",
        data: { transcripts },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMyTranscript: async (req, res) => {
    try {
      const transcripts = await Transcript.findOne({
        student: req.user.id,
      }).populate({
        path: "subjects",
        select:
          "subject money tinChi diem_TK diem_QT diem_CK type_nopTien type_thi type_thiLai",
      });

      res.status(200).json({
        status: "success",
        data: { transcripts },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = transcriptController;
