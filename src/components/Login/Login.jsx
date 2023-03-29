import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ saveMyUser }) {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [validationError, setValidationError] = useState([]);
  let [APIError, setAPIError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const BaseURL = import.meta.env.VITE_BASE_URL


  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  function validateRegister() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .messages({
          "string.empty": "Email must be valid",
        }),
      password: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/))
        .messages({
          "string.empty": "Password must not be empty",
          "string.pattern.base": "Password must be between 6-30",
        }),
    });

    let validationRes = schema.validate(user, { abortEarly: false });
    if (validationRes.error) {
      setValidationError(validationRes.error.details);
      return false;
    } else {
      setValidationError([]);
      return true;
    }
  }

  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    if (validateRegister()) {
      try {
        let res = await axios.post(`${BaseURL}/user/signin`, user);
        if (res.data.message == "Success" && res.status == 200) {
          setAPIError([]);
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          saveMyUser();
          navigate("/");
        }
      } catch (error) {
        let { response } = error;
        setAPIError(response.data.err);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {}, [user]);

  return (
    <>
      <Helmet>
        <title>Login Form</title>
      </Helmet>

      <div className="square-form mx-auto  mt-5 bg-white rounded border p-5">
        <div className="top-form text-center mb-3">
          <i className="fa fa-user-secret fa-4x text-muted mb-3"></i>
          <h4>Login</h4>
        </div>

        {APIError ? (
          <div className="alert alert-msg text-center">{APIError}</div>
        ) : (
          ""
        )}

        <form onSubmit={(e) => login(e)}>
          <div className="form-group mb-3">
            <input
              onChange={(e) => getUserData(e)}
              className="form-control py-2 placeholder-font"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
            <div
              className={
                validationError.filter((ele) => ele.context.label == "email")[0]
                  ? "alert alert-danger mt-2 p-2 text-center"
                  : ""
              }
            >
              {
                validationError.filter((ele) => ele.context.label == "email")[0]
                  ?.message
              }
            </div>
          </div>

          <div className="form-group mb-3">
            <input
              onChange={(e) => getUserData(e)}
              className="form-control py-2 placeholder-font"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
            <div
              className={
                validationError.filter(
                  (ele) => ele.context.label == "password"
                )[0]
                  ? "alert alert-danger mt-2 p-2 text-center"
                  : ""
              }
            >
              {
                validationError.filter(
                  (ele) => ele.context.label == "password"
                )[0]?.message
              }
            </div>
          </div>

          <button className="btn btn-sarahah mt-3 w-100  mt-4 mb-3">
            {isLoading ? (
              <i className="fa fa-spinner fa-spin px-2"></i>
            ) : (
              "Login"
            )}
          </button>

          <ul className="navbar-nav forgot-text">
            <li className="nav-item me-2">
              <Link
                className="nav-link active fs-5 text-decoration-underline"
                aria-current="page"
                to="forgotPassword"
              >
                Forgot Password ?
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
}
