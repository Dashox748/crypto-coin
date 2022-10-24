import React, { useEffect } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";

function Notification({ type, description }) {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer className="toast-notification">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            bg={type}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{type}</strong>
            </Toast.Header>
            <Toast.Body>{description}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default Notification;
