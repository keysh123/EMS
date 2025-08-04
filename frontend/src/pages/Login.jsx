import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const handleChange = async (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
        <h2 className="text-3xl text-white font-sevillana">
          Employee Management System
        </h2>
        <div className="border-none shadow p-6 w-80 bg-white">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className=" block text-gray-700">
                Email
              </label>
              <input
                value={credentials.email}
                onChange={handleChange}
                className="border-gray-200 w-full px-3 py-2 border"
                type="email"
                name="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                value={credentials.password}
                onChange={handleChange}
                className="border-gray-200 w-full px-3 py-2 border"
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4 flex items-center justify-between ">
              <label htmlFor="rememberMe" className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-teal-600">
                Forgot Password?
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
