import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Joi from "joi";
import {
  createSearchParams,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgotPassword({ randomNumber, randOtp }) {
  let [user, setUser] = useState({
    email: "",
  });

  let [validationError, setValidationError] = useState([]);
  let [APIError, setAPIError] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const BaseURL = import.meta.env.VITE_BASE_URL


  function validateEmail() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .messages({
          "string.empty": "Email must be valid",
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

  async function resetPassword(e) {
    e.preventDefault();
    setIsLoading(true);
    if (validateEmail()) {
      try {
        let res = await axios.post(`${BaseURL}/user/reset`, {
          email: user.email,
          OTP: randOtp,
        });
        if (res?.data?.message == "Success" && res?.status == 200) {
          setAPIError([]);
          setIsLoading(false);
          navigate(`/otp/${user.email}`);
        }
      } catch ({ response }) {
        setAPIError(response?.data?.err);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  let getUserData = (e) => {
    let data = { ...user };
    data[e.target.name] = e.target.value;
    setUser(data);
  };

  useEffect(() => {
    randomNumber();
  }, []);

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="container">
        <div className="mx-auto w-50">
          <h3 className="my-3 text-center">Forgot Password</h3>

          <p className="text-decoration-underline text-center text-color">
            An OTP will be sent to your Email to change you password.
          </p>

          {APIError.length != 0 ? (
            <div className="alert alert-msg text-center">{APIError}</div>
          ) : (
            ""
          )}

          <form onSubmit={(e) => resetPassword(e)}>
            <div className="form-group mb-3">
              <h5 className="mb-1" htmlFor="email">
                Registered Email:{" "}
              </h5>
              <input
                onChange={(e) => getUserData(e)}
                className="form-control py-2"
                type="email"
                id="email"
                name="email"
              />
              <div
                className={
                  validationError.filter(
                    (ele) => ele.context.label == "email"
                  )[0]
                    ? "alert alert-msg mt-2 p-2 text-center"
                    : ""
                }
              >
                {
                  validationError.filter(
                    (ele) => ele.context.label == "email"
                  )[0]?.message
                }
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-baseline">
              <button className="btn btn-sarahah rounded-pill px-4 ">
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin px-2"></i>
                ) : (
                  <>
                    {" "}
                    <i className="fa fa-paper-plane me-1"></i> Send
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
