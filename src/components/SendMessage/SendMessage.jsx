import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import Avatar from "../../assets/Images/avatar.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function SendMessage() {
  let { id } = useParams();
  const BaseURL = import.meta.env.VITE_BASE_URL
  let [userFounded, setUserFounded] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [validationError, setValidationError] = useState(null);
  let [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");

  async function checkId() {
    setIsLoading(true);
    try {
      let res = await axios.get(`${BaseURL}/user/${id}`);
      if (res?.data?.message == "Success" && res?.status == 200) {
        setName(res?.data?.founded?.name);
        setUserFounded(true);
        setIsLoading(false);
      }
    } catch (error) {
      setUserFounded(false);
      setIsLoading(false);
    }
  }

  function getMsg(e) {
    setMessage(e.target.value);
  }

  async function sendMsg(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await axios({
        method: "post",
        url: `${BaseURL}/message/send/${id}`,
        data: {
          message,
        },
      });
      if (res.data.added[0].message && res.status == 200) {
        setIsLoading(false);
        handleShow();
        setValidationError(null);
      }
    } catch (error) {
      let { response } = error;
      let msgError = response.data.details;
      setValidationError(msgError.details[0].message);
      handleClose();
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkId();
  }, []);
  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="container mt-5 text-center">
        <div className="upper-section mt-5 bg-white rounded border py-5 position-relative d-flex align-items-center flex-column ">
          <img
            src={Avatar}
            alt="avatar img"
            className="position-absolute top-0 translate-middle-y"
          />
          {userFounded ? (
            <>
              <h3 className="text-muted mt-5 mb-3">{name} </h3>
              {validationError ? (
                <div className="alert alert-msg text-center">
                  {validationError}
                </div>
              ) : (
                ""
              )}
              <form onSubmit={(e) => sendMsg(e)} className="w-75">
                <textarea
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control w-100 mx-auto my-auto px-3 py-2 mb-4"
                  placeholder="Write your message here ...."
                  onChange={(e) => getMsg(e)}
                ></textarea>
                <button className="btn btn-sarahah rounded-pill px-4">
                  <i className="fa fa-paper-plane me-1"></i> Send
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-muted mt-5 mb-3">Not Founded User </h3>
            </>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-dark">
                {" "}
                <h4>Message</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark text-center py-4">
              <h5>
                {" "}
                <i className="fa fa-check-circle"></i> Message sent successfully
              </h5>
              <></>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
