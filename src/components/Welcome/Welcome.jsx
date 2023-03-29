import React from "react";
import { Link } from "react-router-dom";


export default function Welcome() {
  return (
    <div className="container text-center my-2 my-md-5 d-block">
      <h3 className="mb-5">
        Sarahah Allows You To Recieve Constructive Feedback From Your Friends
        And CO-Workers
      </h3>
      <div className="my-2">
        <button className="btn btn-sarahah w-25 ">
          {" "}
          <div className="d-flex justify-content-center align-items-center">
          <i className="fa fa-user me-1"></i>
          <Link className="text-decoration-none text-color fs-5" to="/login">Login</Link> 
          </div>
        </button>
      </div>
      <button className="btn btn-sarahah w-25">
        {" "}
        <div className="d-flex justify-content-center align-items-center">
          <i className="fa fa-pen-to-square me-1"></i>
          <Link className="text-decoration-none text-color fs-5" to="/register">Register</Link> 
          </div>
      </button>
    </div>
  );
}
