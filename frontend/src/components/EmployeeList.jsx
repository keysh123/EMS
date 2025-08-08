import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { employeeColumns, EmployeeButtons } from "../utils/EmployeeHelpers";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/get-employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch");
      let sno=1;

      const modified = data.employees.map((emp) => ({
        sno : sno++,
        _id: emp._id,
        employeeId: emp.employeeId,
        name: emp.userId.name,
        gender: emp.gender,
        department: emp.department?.name || "", // assuming populated
        dob: new Date(emp.dob).toLocaleDateString(),
        profileImg : emp.userId.profileImg,
        designation : emp.designation,
        actions: (
          <EmployeeButtons _id={emp._id} onrefresh={fetchEmployees} />
        ),
      }));

      setEmployees(modified);
      setFilteredEmployees(modified);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setFilteredEmployees(
      employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(search) ||
          emp.employeeId.toLowerCase().includes(search) ||
          emp.department.toLowerCase().includes(search)
      )
    );
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold text-center">Manage Employees</h3>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search Employees"
          className="px-5 py-1 border bg-white"
          onChange={handleSearch}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add new Employee
        </Link>
      </div>

     <div
  style={{
    overflowX: "auto",
    width: "100%",
  }}
  className="mt-5"
>
        <DataTable
          columns={employeeColumns}
          data={filteredEmployees}
          progressPending={loading}
          pagination
          highlightOnHover
            customStyles={{
    table: {
      style: {
        minWidth: "max-content",
      },
    },
  }}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
