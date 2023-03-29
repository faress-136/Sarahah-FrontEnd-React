import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function EmailVerification() {

  let [searchparams] = useSearchParams()

  return (
     <div className='container text-center pt-5 verify'>
        <h3> Verification Email sent to: <span> {searchparams.get("email")} </span></h3>
        <h4 className='py-4'>Please click on confirm your Email so you could login.</h4>
        <button className="btn btn-sarahah py-1 px-3"><Link className='nav-link active' to={"/login"}><h3>Login</h3></Link></button>
    </div>
  )
}
