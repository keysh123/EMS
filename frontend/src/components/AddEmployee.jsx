import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [profileImg, setProfileImg] = useState(null); // store file

  const [data, setData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/department/get-departments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const resData = await res.json();
        if (resData.success) setDepartments(resData.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // append text fields
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // append file
      if (profileImg) {
        formData.append("image", profileImg);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/add-employee`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const resData = await response.json();
      if (!resData.success) {
        throw new Error(resData.message || "Failed to add employee");
      }

      toast.success("Employee added successfully!");
      navigate("/admin-dashboard/employees");
      setData({
        name: "",
        email: "",
        employeeId: "",
        dob: "",
        gender: "",
        designation: "",
        department: "",
        salary: "",
        password: "",
      });
      setProfileImg(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error, try again later");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h3 className="mb-6 text-2xl font-bold">Add Employee</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            onChange={handleChange}
            required
            type="text"
            name="name"
            value={data.name}
            placeholder="Full Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={handleChange}
            required
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            onChange={handleChange}
            required
            type="text"
            name="employeeId"
            value={data.employeeId}
            placeholder="Employee ID"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            onChange={handleChange}
            required
            type="date"
            name="dob"
            value={data.dob}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            onChange={handleChange}
            required
            name="gender"
            value={data.gender}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <input
            onChange={handleChange}
            required
            type="text"
            name="designation"
            value={data.designation}
            placeholder="Designation"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            onChange={handleChange}
            required
            name="department"
            value={data.department}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            onChange={handleChange}
            required
            type="number"
            name="salary"
            value={data.salary}
            placeholder="Salary"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={handleChange}
            required
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Profile Photo */}
        <div >
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            name="profileImg"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
