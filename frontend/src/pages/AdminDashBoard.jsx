import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminDashBoard = () => {
  const {user , loading} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
    navigate('/login')
  }
  },[])
  if(loading){
    return <div>Loading</div>
  }
  
  return (
    <div>AdminDashBoard , {user.name}</div>
  )
}

export default AdminDashBoard