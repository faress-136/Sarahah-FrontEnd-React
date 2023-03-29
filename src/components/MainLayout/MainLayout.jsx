import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'

export default function MainLayout({userData, logout}) {
  return (
    <div className='maindiv'>
      <NavBar userData = {userData} logout = {logout}/>
      <Outlet></Outlet>
    </div>
  )
}
