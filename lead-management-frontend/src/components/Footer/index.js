import React from "react";
import { Row, Col } from "react-bootstrap";
// import logo from "../../assets/images/safaricom-Logo.png";
import "../../assets/css/Footer.css";

/**
 * @author
 * @function Footer
 **/

export const Footer = (props) => {
  return (
    <div className="footer fixed-bottom" style={{ background: "white" }}>
      <Row>
        <Col md={12}>
          <div style={{ borderTop: "1px solid green" }}>
            <p className="footer-item">&copy; Safaricom PLC 2022</p>
          </div>
        </Col>
        {/* <Col md={2}>
          <img src={logo} className="nav-logo" alt="" />
        </Col> */}
      </Row>
    </div>
  );
};
