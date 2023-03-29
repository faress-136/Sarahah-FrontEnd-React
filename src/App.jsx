import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout/MainLayout.jsx'
import Home from './components/Home/Home.jsx'
import EmailVerification from './components/EmailVerification/EmailVerification.jsx'
import jwt_decode from 'jwt-decode'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import SendMessage from './components/SendMessage/SendMessage.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import OTPInput from './components/OTPInput/OTPInput.jsx'
import Welcome from './components/Welcome/Welcome.jsx'

function App() {

  let [userData, setUserData] = useState(null)
  let [randOtp, setRandOtp] = useState(null)


  function saveMyUser(){
    let token = localStorage.getItem('token')
    let decoded = jwt_decode(token)
    setUserData(decoded)
  }

  function logout(){
    localStorage.removeItem('token')
    setUserData(null)
  }

  function randomNumber(){
    let otp = Math.floor(1000 + Math.random() * 9000)
    setRandOtp(otp)
  }
 

  useEffect(() => {
    if(localStorage.getItem('token')){
      saveMyUser()
    }
  }, [randOtp])

  const routers = createBrowserRouter([
    {path: "/", element: <MainLayout userData = {userData} logout = {logout}/>, children:[
      {index: true, element: <ProtectedRoute userData = {userData}> <Home userData = {userData}/> </ProtectedRoute>},
      {path: '/welcome', element: <Welcome/>},
      {path: "/login", element: <Login saveMyUser = {saveMyUser}/>},
      {path: "/register", element: <Register/>},
      {path: "/email_verification", element: <EmailVerification/>},
      {path: "/send/:id", element:  <SendMessage/>},
      {path: "/login/forgotPassword", element: <ForgotPassword randomNumber = {randomNumber} randOtp = {randOtp}/>},
      {path: "/otp/:email", element: <OTPInput  randOtp = {randOtp} />}

    ]}
  ])

  return(
    <>
    <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
