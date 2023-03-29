import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function OTPInput({ randOtp }) {
  let { email } = useParams(); // Get email from url (params)
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [newPassword, setNewPassword] = useState({
    email,
    password: "",
    confirmedPassword: "",
  });

  let [otp, setOtp] = useState("");
  let [otpError, setOtpError] = useState([]);
  let [APIError, setAPIError] = useState([]);
  let [update, setUpdate] = useState(false);
  const BaseURL = import.meta.env.VITE_BASE_URL


  function verifyOtp(e) {
    e.preventDefault();
    setUpdate(false);
    if (randOtp == otp) {
      setOtpError([]);
      handleShow();
    } else {
      handleClose();
      setOtpError(["Incorrect OTP"]);
    }
  }

  function getData(e) {
    let myData = { ...newPassword };
    myData[e.target.name] = e.target.value;
    setNewPassword(myData);
  }

  async function updatePassword(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${BaseURL}/user/update`,
        newPassword
      );
      if (res.data.message == "Success" && res.status == 200) {
        setAPIError([]);
        setUpdate(true);
        navigate(`/otp/${user.email}`);
      }
    } catch ({ response }) {
      setAPIError(response.data.err);
      setUpdate(false);
    }
  }

  useEffect(() => {}, [otp]);

  return (
    <>
      <form onSubmit={(e) => verifyOtp(e)}>
        <div className="container">
          <h4 className="text-center pt-5">Please Enter Your OTP</h4>
          {otpError.length != 0 ? (
            <div className="alert alert-msg text-center w-50  mx-auto mt-5">
              <span className="fs-4 fw-bold">{otpError}</span>
            </div>
          ) : (
            ""
          )}
          <div className=" d-flex justify-content-center align-items-center ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              containerStyle="fs-1 pt-5"
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center py-4">
            <button className="btn btn-sarahah rounded-pill px-4">
              <i className="fa fa-circle-check me-1"></i> Verify
            </button>
          </div>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {" "}
            <h4>Change Password</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <>
            <Form onSubmit={(e) => updatePassword(e)}>
              {APIError.length != 0 ? (
                <div className="alert alert-danger text-center">{APIError}</div>
              ) : (
                ""
              )}
              <Form.Group className="mb-3" controlId="pass">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => getData(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="text"
                  name="confirmedPassword"
                  placeholder="Password"
                  onChange={(e) => getData(e)}
                />
              </Form.Group>
              {update ? (
                ""
              ) : (
                <button className="btn btn-sarahah text-color outline_btn mx-auto w-100">
                  Submit
                </button>
              )}

              {update ? (
                <>
                  <Alert
                    className="w-100 text-center d-block my-3 p-2"
                    variant="success"
                  >
                    {" "}
                    Updated Successfully
                  </Alert>
                  <button className="btn btn-sarahah text-color outline_btn mx-auto w-100">
                    <Link
                      className="dropdown-item black_link fw-bold"
                      to={"/login"}
                    >
                      {" "}
                      Login
                    </Link>
                  </button>
                </>
              ) : (
                ""
              )}
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}
