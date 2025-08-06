import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  return (
    <>
    <div className='p-5'>
      <div className='text-center'>
      <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search Department' className='px-5 py-0.5 border bg-white' />
        <Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-teal-600 rounded text-white'>Add new Department</Link>
      </div>
    </div>
    </>
  )
}

export default DepartmentList