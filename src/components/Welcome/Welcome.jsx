import React from "react";

export default function Welcome() {
  return (
    <div className="container text-center my-2 my-md-5 d-block">
      <h3 className="mb-5">
        Sarahah Allows You To Recieve Constructive Feedback From Your Friends
        And CO-Workers
      </h3>
      <div className="my-2">
        <button className="btn btn-sarahah w-25">
          {" "}
          <i className="fa fa-user"></i> Login
        </button>
      </div>
      <button className="btn btn-sarahah w-25">
        {" "}
        <i className="fa fa-pen-to-square"></i> Register
      </button>
    </div>
  );
}
