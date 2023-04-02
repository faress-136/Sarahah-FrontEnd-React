import React, { useEffect, useState } from "react";
import Avatar from "../../assets/Images/avatar.png";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home({ userData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [id, setId] = useState(userData.userId);
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [messages, setMessages] = useState([]);
  const BaseURL = import.meta.env.VITE_BASE_URL


  async function getMessages() {
    await axios({
      method: "get",
      url: `${BaseURL}/message/`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setMessages(res.data.relatedMessages);
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="container mt-5 text-center ">
        <div className="upper-section mt-5 bg-white rounded border py-5 position-relative d-flex align-items-center flex-column ">
          <img
            src={Avatar}
            alt="avatar img"
            className="position-absolute top-0 translate-middle-y"
          />
          <h3 className="text-muted mt-4 mt-md-5 mb-3">{userData.name} </h3>
          <button
            className="btn btn-sarahah rounded-pill px-3"
            onClick={() => handleShow(true)}
          >
            <i className="fa fa-share-nodes"></i> Share Profile
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            {" "}
            <h3>Share Profile</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <>
            <div className="user-link text-center p-3 ">
              <Link to={`send/${id}`}  target="_blank">
                {BaseURL}/user
                <br />
                {id}{" "}
              </Link>
            </div>
            <Button
              variant="secondary"
              type="submit"
              className=" text-white n mx-auto w-100"
              onClick={() => handleClose(true)}
            >
              Close
            </Button>
          </>
        </Modal.Body>
      </Modal>

      <div className="container mt-3">
        {messages.length > 0 ? (
          <>
            {messages.map((ele) => (
              <div className="bg-white border py-4 mb-3 text-muted">
                <p className="text-center msg">{ele?.message}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="upper-section mx-auto mt-5 bg-white rounded border py-5 position-relative d-flex justify-content-center align-items-center">
              <h5>You don't have any messages yet ....</h5>
            </div>
          </>
        )}
      </div>
    </>
  );
}
