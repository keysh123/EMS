import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../utils/DepartmentHelpers";
import { toast } from "react-toastify";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false); // NEW

  const fetchDepartments = async () => {
    try {
      setLoading(true); // START LOADING
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/get-departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!data.success) throw new Error(data.message || "Failed to fetch");

      let sno = 1;
      const modifiedData = data.departments.map((dept) => ({
        _id: dept._id,
        sno: sno++,
        name: dept.name,
        actions: (
          <DepartmentButtons _id={dept._id} onrefresh={fetchDepartments} />
        ),
      }));

      setDepartments(modifiedData || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false); // STOP LOADING
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search Department"
          className="px-5 py-0.5 border bg-white"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add new Department
        </Link>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={departments}
          progressPending={loading} // BUILT-IN LOADING UI
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default DepartmentList;
