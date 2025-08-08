const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    designation: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
