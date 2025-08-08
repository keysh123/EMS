// utils/EmployeeHelpers.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import { toast } from "react-toastify";

export const employeeColumns = [
  {
    name : "Sr no.",
    selector :(row) =>  row.sno

  },
  {
    name: "Profile",
    selector: (row) => (
      <img
        src={`http://localhost:5000/uploads/${row.profileImg}`} // change URL if needed
        alt={row.name}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
    sortable: false,
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
    sortable: true,
  },
  {
    name: "Actions",
    selector: (row) => row.actions,
    width: "320px",
  },
];


export const EmployeeButtons = ({ _id, onrefresh }) => {
  const navigate = useNavigate();
  const [modelVisible, setModelVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/delete/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Employee deleted successfully");
      onrefresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => navigate(`/admin-dashboard/employees/view/${_id}`)}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
        className="px-3 py-1 bg-teal-600 text-white rounded"
      >
        Edit
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
        className="px-3 py-1 bg-yellow-600 text-white rounded"
      >
        Salary
      </button>
      <button
        onClick={() => setModelVisible(true)}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Delete
      </button>

      {modelVisible && (
        <DialogBox
          title="Confirm Delete"
          message="Are you sure you want to delete this employee?"
          onClose={() => setModelVisible(false)}
        >
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setModelVisible(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              onClick={() => {
                setModelVisible(false);
                handleDelete();
              }}
            >
              Yes, Delete
            </button>
          </div>
        </DialogBox>
      )}
    </div>
  );
};
