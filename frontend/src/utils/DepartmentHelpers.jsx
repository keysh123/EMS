import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import { toast } from "react-toastify";
export const columns = [
  {
    name: "Sr No",
    selector: (row) => row.sno,
  },
  {
    name: "Department name",
    selector: (row) => row.name,
    sortable : true
  },
  {
    name: "Action",
    selector: (row) => row.actions,
  },
];

export const DepartmentButtons = ({ _id , onrefresh}) => {
  const navigate = useNavigate();
  const [modelVisible, setModelVisible] = useState(false);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/delete/${_id}`,
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

      toast.success("Department deleted successfully");
      onrefresh()

      // Notify parent to refresh list (optional)
    
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete department");
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        onClick={() => {
          navigate(`/admin-dashboard/department/${_id}`);
        }}
        className="px-3 py-1 bg-teal-600 text-white"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setModelVisible(true);
        }}
        className="px-3 py-1 bg-red-600 text-white"
      >
        Delete
      </button>

      {modelVisible && (
        <DialogBox
          title="Confirm Delete"
          message="Are you sure you want to delete department?"
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
