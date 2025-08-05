import React, { useContext, useEffect } from "react";
import { createContext } from "react";

import { useState } from "react";

import { toast } from "react-toastify";


const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false)
  
  useEffect(() => {
     setLoading(true)
    const verifyUser = async () => {
     
      try {
        const token = localStorage.getItem('token')
        const result = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            },
          
          }
        );
        const data = await result.json();
        if (data.success) {
          login(data.user);
        }
        else{
          // navigate('/login')
          setUser(null)
          toast.error(data.message || "Error , logIn again");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error , logIn again");
      }
      finally{
        setLoading(false)
      }
    };
    verifyUser()
  },[]);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
export const useAuth = () => useContext(userContext);

export default AuthContext;
