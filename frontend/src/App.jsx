import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is imported
import { useAuth } from "./context/AuthContext";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/DepartmentList";

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role == "admin" ? (
                  <Navigate to='/admin-dashboard'/>
                ) : (
                  <Navigate to='/employee-dashboard'/>
                )
              ) : (
                 <Navigate to='/login'/>
              )
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                {" "}
                <RoleBasedRoutes requiredRole={["admin"]}>
                  {" "}
                  <AdminDashBoard />{" "}
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary/>}/>
            <Route path="/admin-dashboard/departments" element={<DepartmentList/>}/>
            </Route>
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["employee"]}>
                  <AdminDashBoard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                user.role == "admin" ? (
                  <Navigate to='/admin-dashboard'/>
                ) : (
                  <Navigate to='/employee-dashboard'/>
                )
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </BrowserRouter>

      {/* Toast container with top-right position and white text */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" // This gives a bg automatically
      />
    </>
  );
};

export default App;
