import React from 'react'
import {BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import Logout from './pages/Logout'
import Adminlayout from './components/layouts/Adminlayout'
import AdminUser from './pages/AdminUser'
import AdminContact from './pages/AdminContact'
import AdminUpdate from './pages/AdminUpdate'
import Sform from './pages/Sfrom'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <div className='bg-slate-600'>
    <NavBar/>
    <Routes>
      <Route path ="/" element={<Home/>} />
      <Route path ="/contact" element={<Contact/>} />
      <Route path ="/login" element={<Login/>} />
      <Route path ="/register" element={<Register/>} />
      <Route path ="/logout" element={<Logout/>} />
      <Route path ="/student-details" element={<Sform/>} />

      <Route path='/admin' element={<Adminlayout />}>
        <Route path='user' element={<AdminUser />} />
        <Route path='contact' element={<AdminContact />} />
        <Route path='update/:id' element={<AdminUpdate />} />
      </Route>
      </Routes>
{/* <footer></footer> */}
      </div>
    </BrowserRouter>
    </>
  )
}

export default App