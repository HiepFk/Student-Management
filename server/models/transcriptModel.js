const mongoose = require("mongoose");
const Subject = require("./subjectModel");

const transcriptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please tell us the Id of the teacher"],
      unique: true,
    },
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubjectEd",
      },
    ],
    Tb_diem: {
      type: Number,
      default: 0,
    },
    Sum_TichLuy: {
      default: 0,
      type: Number,
    },
    Sum_Tien: {
      default: 0,
      type: Number,
    },
    debt: {
      type: Number,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

const Transcript = mongoose.model("Transcript", transcriptSchema);

module.exports = Transcript;
