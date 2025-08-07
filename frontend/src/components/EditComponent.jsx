import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);        // NEW
  const [submitting, setSubmitting] = useState(false); // NEW

  // Fetch existing department info
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/get-info/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        setFormData({
          name: data.department.name || '',
          description: data.department.description || '',
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch department details");
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/edit-department/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Department updated successfully");
      navigate("/admin-dashboard/departments");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setSubmitting(false); // Done submitting
    }
  };

  // Show loader while fetching department data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-600 font-medium">Loading department info...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="mb-6 text-2xl font-bold">Edit Department</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            onChange={handleChange}
            required
            type="text"
            name="name"
            placeholder="Enter Department name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            value={formData.name}
            disabled={submitting}
          />
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            onChange={handleChange}
            rows={4}
            name="description"
            placeholder="Enter Description"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            value={formData.description}
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full mt-6 bg-teal-600 text-white font-bold py-2 px-4 rounded ${
            submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal-700'
          }`}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditComponent;
