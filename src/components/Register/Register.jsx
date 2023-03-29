import axios from 'axios'
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { createSearchParams, useNavigate } from 'react-router-dom'


export default function Register() {

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    age: 0
  })

  let [validationError, setValidationError] = useState([])
  let [APIError, setAPIError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  const BaseURL = import.meta.env.VITE_BASE_URL


  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  function validateRegister() {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required().messages({
        "string.empty": "Name must not be empty",
        "string.min": "Name must be greater than 3 characters",
        "string.max": "Name must be smaller than 20 characters"
      }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
        "string.empty": "Email must be valid",
      }),
      password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
        "string.empty": "Password must not be empty",
        "string.pattern.base": "Password must be between 6-30"
      }),
      confirmedPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
        "string.empty": "Confirmed Password must not be empty",
        "string.pattern.base": "Confirmed Password must be between 6-30"
      }),
      age: Joi.number().min(10).max(100).messages({
        "number.min": "Age must be greater than 10",
        "number.max": "Age must be smaller than 100",
      })
    })

    let validationRes = schema.validate(user, { abortEarly: false })
    if (validationRes.error) {
      setValidationError(validationRes.error.details)
      return false
    }
    else {
      setValidationError([])
      return true
    }
  }

  async function register(e) {
    e.preventDefault()
    setIsLoading(true)
    if (validateRegister()) {
      try {
        let res = await axios.post(`${BaseURL}/user/signup`, user)
        if (res?.data?.message == "Success" && res?.status == 201) {
          setAPIError([])
          setIsLoading(false)
          navigate({
            pathname: '/email_verification',
            search: createSearchParams({
              email: user.email
            }).toString()
          })
        }
      }
      catch (error) {
        let { response } = error
        console.log(response);
        setAPIError(response?.data?.err)
        setIsLoading(false)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {

  }, [user])


  return (
    <>
      <Helmet>
        <title>Registeration Form</title>
      </Helmet>

      <div className='square-form mx-auto  mt-5 bg-white rounded border p-5'>
        <div className="top-form text-center mb-3">
          <i className='fa fa-pen-to-square fa-4x text-muted mb-2'></i>
          <h4 className='mb-2'>Register</h4>
        </div>



        {APIError ? <div className='alert alert-msg text-center'>{APIError}</div> : ""}

        <form onSubmit={(e) => register(e)}>
          <div className='form-group mb-3'>
            <input onChange={(e) => getUserData(e)} className='form-control py-2 placeholder-font' type="text" id='name' name='name' placeholder='Enter Your Name' />
            <div className={validationError.filter((ele) => ele.context.label == "name")[0] ? "alert alert-danger mt-2 p-2 text-center" : ""}>
              {validationError.filter((ele) => ele.context.label == "name")[0]?.message}
            </div>
          </div>

          <div className='form-group mb-3'>
            <input onChange={(e) => getUserData(e)} className='form-control py-2 placeholder-font' type="email" id='email' name='email' placeholder='Enter Your Email' />
            <div className={validationError.filter((ele) => ele.context.label == "email")[0] ? "alert alert-danger mt-2 p-2 text-center" : ""}>
              {validationError.filter((ele) => ele.context.label == "email")[0]?.message}
            </div>
          </div>

          <div className='form-group mb-3'>
            <input onChange={(e) => getUserData(e)} className='form-control py-2 placeholder-font' type="password" id='password' name='password' placeholder='Enter Your Password' />
            <div className={validationError.filter((ele) => ele.context.label == "password")[0] ? "alert alert-danger mt-2 p-2 text-center" : ""}>
              {validationError.filter((ele) => ele.context.label == "password")[0]?.message}
            </div>
          </div>

          <div className='form-group mb-3'>
            <input onChange={(e) => getUserData(e)} className='form-control py-2 placeholder-font' type="password" id='confirmedPassword' name='confirmedPassword' placeholder='Enter Your confirmed Password' />
            <div className={validationError.filter((ele) => ele.context.label == "confirmedPassword")[0] ? "alert alert-danger mt-2 p-2 text-center" : ""}>
              {validationError.filter((ele) => ele.context.label == "confirmedPassword")[0]?.message}
            </div>
          </div>

          <div className='form-group mb-3'>
            <input onChange={(e) => getUserData(e)} className='form-control py-2 placeholder-font' type="number" id='age' name='age' placeholder='Enter Your Age' />
            <div className={validationError.filter((ele) => ele.context.label == "age")[0] ? "alert alert-danger mt-2 p-2 text-center" : ""}>
              {validationError.filter((ele) => ele.context.label == "age")[0]?.message}
            </div>
          </div>

          <button className='btn btn-sarahah mt-3 w-100  mt-4 mb-5'>
            {isLoading ? <i className='fa fa-spinner fa-spin px-2'></i> : "Register"}
          </button>


        </form>


      </div>



    </>
  )
}
