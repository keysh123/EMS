import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({children,requiredRole}) => {
    const {user , loading} = useAuth()
     if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  )
}
    if(!requiredRole.includes(user.role)){
        // <div>Not Authorized</div>
        <Navigate to='/not-authorized'/>
    }
  return user ? children : <Navigate to = '/login'/>
}

export default RoleBasedRoutes