const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us the name of class"],
    unique: true,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please tell us the teacher of class"],
  },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
