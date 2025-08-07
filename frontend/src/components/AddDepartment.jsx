import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddDepartment = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const handleChange = async (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // or wherever you store it

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/add-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // if auth required
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (!resData.success) {
        throw new Error(resData.message || "Failed to add department");
      }

      toast.success("Department added successfully!");
      navigate("/admin-dashboard/departments");
      setData({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.log(error);
      toast.error("Error, try again later" || error.message);
    }
  };

  return (
    <>
      <div>
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="mb-6 text-2xl font-bold">Add Department</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                onChange={handleChange}
                required
                type="text"
                name="name"
                placeholder="Enter Department name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                onChange={handleChange}
                rows={4}
                type="text"
                name="description"
                placeholder="Enter Description"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4  rounded"
            >
              Add Department
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
