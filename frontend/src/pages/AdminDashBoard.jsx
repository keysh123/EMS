import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import Navbar from '../components/Navbar'
import AdminSummary from '../components/AdminSummary'

const AdminDashBoard = () => {
  const {user } = useAuth()
  

  
  return (
    <>
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>

    </div>
    
    
    
    </>
  )
}

export default AdminDashBoard