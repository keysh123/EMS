import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashBoard from './pages/AdminDashBoard'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'  // make sure this is imported
import { useAuth } from './context/AuthContext'
import EmployeeDashBoard from './pages/EmployeeDashBoard'

const App = () => {
  const {user} = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? user.role=='admin' ? <AdminDashBoard/> : <EmployeeDashBoard/>  : <Login/>}/>
          <Route path='/admin-dashboard' element={<AdminDashBoard />} />
          <Route path='/employee-dashboard' element={<AdminDashBoard />} />
          <Route path='/login' element={<Login />} />
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
  )
}

export default App
