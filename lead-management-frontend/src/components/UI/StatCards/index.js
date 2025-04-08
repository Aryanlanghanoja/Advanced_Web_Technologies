import React from "react";
import { Row, Col } from "react-bootstrap";

/**
 * @author
 * @function StatCard
 **/

export const StatCard = (props) => {
  return (
    <Col>
      <Row
        id={props.id}
        className="mt-3 ms-1"
        style={{
          height: "100px",
          borderRadius: "5px",
        }}
      >
        <Col style={{ margin: "auto" }}>
          <p
            className="text-white mb-0"
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {props.number}
            <span
              style={{
                fontSize: "12px",
                paddingLeft: "10px",
                fontWeight: "normal",
              }}
            >
              {props.percent}
            </span>
          </p>
          <span
            className="text-center text-white m-0"
            style={{
              fontSize: "12px",
            }}
          >
            {props.title}
          </span>
        </Col>
        <Col style={{ margin: "auto" }}>
          <p className="text-center mb-0">{props.icon}</p>
        </Col>
      </Row>
    </Col>
  );
};
