import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import SarahahImg from "../../assets/Images/Logo.png";

export default function NavBar({ userData, logout }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [deleted, setdeleted] = useState(false);

  return (
    <>
      <nav className="navbar navbar-color navbar-expand-lg">
        <div className="container d-md-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <img
                className="img-fluid logo-game me-2"
                src={SarahahImg}
                alt=""
              />
              <Link className="nav-link active" to={"/"}>
                <h4 className="m-0 fw-bold text-white">Sarahah</h4>
              </Link>
            </div>
          </div>

          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarNavDropdown">
              <ul className="navbar-nav">
                {userData ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        aria-current="page"
                        to=""
                      >
                        Messages
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        to="login"
                        onClick={() => logout()}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active text-white" to="login">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        to="register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
