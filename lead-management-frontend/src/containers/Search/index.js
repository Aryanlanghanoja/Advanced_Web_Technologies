import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/Layout";
import { Row, Col, Button, Table, Form, Alert } from "react-bootstrap";
import { HomeInput } from "../../components/UI/Input";
import { getSearchLeads } from "../../actions";

/**
 * @author
 * @function Search
 **/

export const Search = (props) => {
  const leads = useSelector((state) => state.leadsSearched);
  const dispatch = useDispatch();
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [service_type, setServiceType] = useState("");
  const [fromDate, setDate] = useState("");
  const [toDate, setAnotherDate] = useState("");
  const [created_by, setCreatedBy] = useState("");

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  const searchLeads = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("region", region);
    form.append("status", status);
    form.append("service_type", service_type);
    form.append("fromDate", fromDate);
    form.append("toDate", toDate);
    form.append("created_by", created_by);

    // console.log(form);

    const update = {
      region,
      status,
      service_type,
      fromDate,
      toDate,
      created_by,
    };
    dispatch(getSearchLeads(update));
  };

  const renderLeads = (leads) => {
    let leadItem = [];
    for (let lead of leads) {
      leadItem.push(
        <tr key={lead._id}>
          <td>{lead.leadId}</td>
          <td>{lead.createdAt.substring(0, 10)}</td>
          <td>
            {convertTZ(lead.createdAt, "Africa/Nairobi")
              .toString()
              .substring(25, 16)}
          </td>
          <td>{lead.business_name}</td>
          <td>{lead.industry}</td>
          <td>{lead.contact_person}</td>
          <td>{lead.contact_email}</td>
          <td>{lead.contact_number}</td>
          <td>{lead.service_type}</td>
          <td>{lead.service_subtype}</td>
          <td>{lead.region}</td>
          <td>{lead.created_by}</td>
          <td>{lead.creator_department}</td>
          <td>{lead.status}</td>
        </tr>
      );
    }
    return leadItem;
  };

  function SearchAlert() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p className="mb-0 me-0">
            Date Selection is mandatory the rest of the fields are optional and
            you can do partial word search.
          </p>
        </Alert>
      );
    }
  }

  return (
    <Layout>
      <div className="" style={{ borderTop: "1px solid #efefef" }}>
        <Row className=" me-0">
          <Col className="col-md-9">
            <h1
              style={{ marginLeft: "40px", marginTop: "60px", color: "gray" }}
            >
              Search Page
            </h1>
          </Col>
          <Col
            className=""
            style={{
              marginRight: "0px",
              marginTop: "20px",
              paddingRight: "0px",
            }}
          >
            <Row className=" me-0">
              <Form>
                <Row className=" me-0">
                  <Col>
                    <Row>
                      <Col>
                        <HomeInput
                          label="From"
                          type="date"
                          value={fromDate}
                          required
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <HomeInput
                          label="To"
                          type="date"
                          value={toDate}
                          required
                          onChange={(e) => setAnotherDate(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <HomeInput
                      label="Region"
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                    <HomeInput
                      label="Service"
                      type="text"
                      value={service_type}
                      onChange={(e) => setServiceType(e.target.value)}
                    />
                    <HomeInput
                      label="Status"
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <HomeInput
                      label="Created By"
                      type="text"
                      value={created_by}
                      onChange={(e) => setCreatedBy(e.target.value)}
                    />
                    <Button
                      className="btn-sm"
                      variant="success"
                      type="submit"
                      style={{ width: "85px" }}
                      onClick={searchLeads}
                    >
                      Search{" "}
                      <i className="bi bi-search text-white ms-2 me-0"></i>
                    </Button>
                    <Row
                      className="ms-0 me-0 mt-1"
                      style={{ fontSize: "11px" }}
                    >
                      <SearchAlert />
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
        </Row>
        <div
          style={{
            borderTop: "1px solid #efefef",
            margin: "10px 0px 0px 0px",
          }}
        >
          <Col className=" mt-3 border">
            <Table striped bordered hover size="sm" className="tablet">
              <thead className="table-head">
                <tr>
                  <th className="th">Lead ID</th>
                  <th className="th">Date</th>
                  <th className="th">Time</th>
                  <th className="th">Business</th>
                  <th className="th">Industy</th>
                  <th className="th">Contact</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Service</th>
                  <th className="th">Sub Type</th>
                  <th className="th">Region</th>
                  <th className="th">created_By</th>
                  <th className="th">Department</th>
                  <th className="th">Status</th>
                </tr>
              </thead>
              <tbody className="">{renderLeads(leads.leadsSearched)}</tbody>
            </Table>
          </Col>
        </div>
      </div>
    </Layout>
  );
};
