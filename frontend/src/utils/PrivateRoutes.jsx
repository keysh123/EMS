import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth()


  if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  )
}


  return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes
