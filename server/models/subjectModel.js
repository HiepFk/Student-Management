const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell name of subject"],
  },
  Id_Subject: {
    type: String,
    required: [true, "Please tell ID of subject"],
  },
  credit: {
    type: Number,
  },
  coefficient: {
    type: Number,
  },
  money: Number,
  day_hoc: {
    type: Number,
  },
  ca_hoc: {
    type: String,
  },
  ki_hoc: {
    type: Number,
  },
  room_hoc: {
    type: String,
  },
  year: {
    type: Number,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  quantity: {
    type: Number,
    // required: [true, "Please tell quantity of subject"],
    maxlength: 35,
  },
  ki_thi: {
    type: Number,
  },
  day_thi: {
    type: Number,
  },
  ca_thi: {
    type: String,
  },
  room_thi: {
    type: String,
  },
  timeOpen: {
    type: Date,
    default: new Date(),
  },
  timeThi: {
    type: Date,
    default: new Date(),
  },
});

subjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "teacher",
    select: "name Id_User",
  });
  next();
});

subjectSchema.pre("save", function (next) {
  this.money = (this.credit * this.coefficient * 400).toFixed();
  next();
});
subjectSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});
subjectSchema.post(/^findOneAnd/, function () {
  this.r.money = (this.r.credit * this.r.coefficient * 400).toFixed();
  this.r.quantity == this.r.students.length;
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
