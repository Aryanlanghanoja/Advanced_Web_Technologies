import React from "react";
import { Row, Col } from "react-bootstrap";

/**
 * @author
 * @function NoPageFound
 **/

export const NoPageFound = (props) => {
  return (
    <div>
      <div className="home" style={{ borderTop: "1px solid #efefef" }}>
        <Row style={{ marginTop: "100px" }}>
          <Col
            className="alert alert-danger col-4 "
            role="alert"
            style={{ margin: "auto", top: "50%" }}
          >
            <h4 className="alert-heading text-center">
              404 error! Page not found
            </h4>
            <p className="text-center">
              Please confirm the page you want to visit.
            </p>
            <hr />
            <p className="mb-0 text-center">
              Navigate back to <a href="/">Home</a> or enter the correct url.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};
