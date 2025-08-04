import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import AdminDashBoard from './pages/AdminDashBoard'
import Login from './pages/Login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<AdminDashBoard/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App