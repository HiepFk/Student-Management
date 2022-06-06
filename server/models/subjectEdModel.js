const mongoose = require("mongoose");
const Subject = require("./subjectModel");
const Transcript = require("./transcriptModel");

const subjectEdSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please tell us the Id of the student"],
    },
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: [true, "Please tell us the Id of the subject"],
    },
    tinChi: {
      type: Number,
      default: 0,
    },
    money: Number,
    diem_QT: {
      type: Number,
      default: 0,
    },
    diem_CK: {
      type: Number,
      default: 0,
    },
    diem_TK: {
      type: Number,
      default: 0,
    },
    type_thi: {
      type: Boolean,
      default: false,
    },
    type_thiLai: {
      type: Boolean,
      default: false,
    },
    type_nopTien: {
      type: Boolean,
      default: false,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

subjectEdSchema.statics.calcAverage = async function (studentId) {
  const stats = await this.aggregate([
    {
      $match: { student: studentId, type_thi: true },
    },
    {
      $group: {
        _id: "$student",
        nTichLuy: { $sum: "$tinChi" },
        // nMoney: { $sum: "$money" },
        avgPoint: { $avg: "$diem_TK" },
      },
    },
  ]);
  const stats2 = await this.aggregate([
    {
      $match: { student: studentId },
    },
    {
      $group: {
        _id: "$student",
        nMoney: { $sum: "$money" },
      },
    },
  ]);

  if (stats.length > 0 && stats2.length > 0) {
    await Transcript.findOneAndUpdate(
      { student: studentId },
      {
        Tb_diem: stats[0].avgPoint,
        Sum_TichLuy: stats[0].nTichLuy,
        Sum_Tien: stats2[0].nMoney,
      },
      {
        new: true,
      }
    );
  } else if (stats.length <= 0 && stats2.length > 0) {
    await Transcript.findOneAndUpdate(
      { student: studentId },
      {
        Tb_diem: 0,
        Sum_TichLuy: 0,
        Sum_Tien: stats2[0].nMoney,
      },
      {
        new: true,
      }
    );
  } else {
    await Transcript.findOneAndUpdate(
      { student: studentId },
      {
        Tb_diem: 0,
        Sum_TichLuy: 0,
        Sum_Tien: 0,
      },
      {
        new: true,
      }
    );
  }
};

subjectEdSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subject",
    // select: "name Id_Subject room_hoc ca_hoc day_hoc",
  });
  next();
});

subjectEdSchema.pre("save", async function () {
  const subject = await Subject.findById(this.subject);
  this.money = subject.money;

  this.constructor.calcAverage(this.student);
});

subjectEdSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});
subjectEdSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverage(this.r.student);
});

const SubjectEd = mongoose.model("SubjectEd", subjectEdSchema);

module.exports = SubjectEd;
