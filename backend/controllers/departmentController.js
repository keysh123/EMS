const Department = require("../models/departmentModel");

const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log('hiii');
    
    if(!name) {
        res.status(401).json({
            success : false , message : 'Name is required'
        })
    }
    const department = new Department({name , description})
    await department.save()
    
    
    
    res
      .status(201)
      .json({
        success: true,
        message: "Depatrment Created Successfully",
        department
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
  }
};
const getDepartmentInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department fetched successfully",
      department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    department.name = name;
    department.description = description;

    await department.save();

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized',
      });
    }

    const departments = await Department.find();

    res.status(200).json({
      success: true,
      message: 'Departments fetched successfully',
      departments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addDepartment,
  getDepartments,
  getDepartmentInfo,
  editDepartment,
  deleteDepartment
};
