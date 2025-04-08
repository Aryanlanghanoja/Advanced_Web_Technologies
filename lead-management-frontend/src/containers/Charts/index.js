import React from "react";
import { Row, Col } from "react-bootstrap";

import {
  Chart,
  RegionChart,
  StatusChart,
  DateChart,
  ServiceSubChart,
} from "../../components/Charts";

/**
 * @author
 * @function PerformanceCharts
 **/

const PerformanceCharts = (props) => {
  return (
    <div>
      <Row className="mt-3">
        <Col className="mb-3 col-7">
          <Row>
            <Col className="mb-3 col-5">
              <Chart />
            </Col>
            <Col className="mb-3 ms-5 col-5">
              <RegionChart />
            </Col>
          </Row>
        </Col>
        <Col className="mb-3 col-5">
          <StatusChart />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="m-3">
          <ServiceSubChart />
        </Col>
        <Col className="m-3">
          <DateChart />
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceCharts;
