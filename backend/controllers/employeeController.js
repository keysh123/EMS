const multer = require("multer");
const Employee = require("../models/employeeModel.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const path = require("path");

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// ===== Add Employee =====
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      gender,
      designation,
      department,
      salary,
      employeeId,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      profileImg: req.file ? req.file.filename : "",
    });

    // Create Employee
    const newEmployee = await Employee.create({
      userId: newUser._id,
      employeeId,
      dob,
      gender,
      designation,
      department,
      salary,
    });

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      user: newUser,
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Get All Employees =====
const getEmployees = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const employees = await Employee.find()
      .populate("userId", "name email profileImg")
      .populate("department", "name");

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Edit Employee =====
const editEmployee = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID
    console.log(req.body);
    const {
      name,
      email,
      password,
      dob,
      gender,
      designation,
      department,
      salary,
      employeeId,
    } = req.body;
    
    

    const employee = await Employee.findById(id).populate("userId");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Update user fields
    if (name) employee.userId.name = name;
    if (email) employee.userId.email = email;
    if (password) {
      employee.userId.password = await bcrypt.hash(password, 10);
    }
    if (req.file) {
      employee.userId.profileImg = req.file.filename;
    }
    await employee.userId.save();

    // Update employee fields
    if (employeeId) employee.employeeId = employeeId;
    if (dob) employee.dob = dob;
    if (gender) employee.gender = gender;
    if (designation) employee.designation = designation;
    if (department) employee.department = department;
    if (salary) employee.salary = salary;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Delete Employee =====
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID

    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Remove linked user
    await User.findByIdAndDelete(employee.userId);

    // Remove employee record
    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// ===== Get Single Employee Data =====
const getEmployeeData = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID from URL

    const employee = await Employee.findById(id)
      .populate("userId", "name email profileImg role") // get user details
      .populate("department", "name"); // get department name

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee data fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  upload,
  addEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
  getEmployeeData
};
