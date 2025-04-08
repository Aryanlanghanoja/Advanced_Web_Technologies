import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Form } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import "../../assets/css/bootstrap-icons/bootstrap-icons.css";
import "../../assets/css/Home.css";
import { getAllLeads, getSingleLead, updateLeadClose } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { HomeInput } from "../../components/UI/Input";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const auth = useSelector((state) => state.auth);
  const userName = auth.user.fullname;
  const _id = auth.user._id;
  const leads = useSelector((state) => state.leads);
  const singleLeadItem = useSelector((state) => state.singleLead.singleLead);
  const dispatch = useDispatch();
  const leadId = singleLeadItem.leadId;
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getAllLeads());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  const renderLeads = (leads) => {
    let leadItem = [];
    for (let lead of leads) {
      if (lead.status === "ASSIGNED" && lead.sales_person === userName) {
        leadItem.push(
          <tr key={lead._id}>
            <td>
              <p
                className="home-edit"
                id="lead"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(getSingleLead(getLeadId(lead.leadId)));
                }}
              >
                {lead.leadId}
              </p>
            </td>
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
    }
    return leadItem;
  };

  const renderClosedLeads = (leads) => {
    let leadItem = [];
    for (let lead of leads) {
      if (lead.status === "CLOSED" && lead.sales_person === userName) {
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
    }
    return leadItem;
  };

  const totalLeadsCount = (leads) => {
    let count = [];
    for (let lead of leads) {
      if (lead.status !== "OPEN" && lead.sales_person === userName) {
        count.push(lead);
      }
    }
    return count.length;
  };

  const assignedLeadsCount = (leads) => {
    let count = [];
    for (let lead of leads) {
      if (lead.status === "ASSIGNED" && lead.sales_person === userName) {
        count.push(lead);
      }
    }
    return count.length;
  };

  const closedLeadsCount = (leads) => {
    let count = [];
    for (let lead of leads) {
      if (lead.status === "CLOSED" && lead.sales_person === userName) {
        count.push(lead);
      }
    }
    return count.length;
  };

  const getLeadId = (item) => {
    const leadPair = {};
    leadPair.leadId = item;
    // console.log(leadPair);
    return leadPair;
  };

  const updateLead = (e) => {
    const form = new FormData();
    form.append("_id", _id);
    form.append("leadId", leadId);
    form.append("notes", notes);

    const update = {
      _id,
      leadId,
      notes,
    };

    dispatch(updateLeadClose(update));
  };

  const reload = (e) => {
    window.location.reload(false);
  };

  return (
    <Layout>
      <div className="home" style={{ borderTop: "1px solid #efefef" }}>
        <div>
          <Row className="leads">
            <h4 className="text-muted mt-1">Leads assigned to you:</h4>
            <p className="mt-0 mb-0 text-success">
              Select lead ID to populate form below for actioning.
            </p>
            <Col className="scroller table-container">
              <Table striped bordered hover size="sm" className="table">
                <thead className="table-head">
                  <tr>
                    <th>Lead ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Business</th>
                    <th>Industy</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Sub Type</th>
                    <th>Region</th>
                    <th>created_By</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{renderLeads(leads.leads)}</tbody>
              </Table>
            </Col>
            <Col
              className=""
              style={{
                marginLeft: "10px",
              }}
            >
              <Row className="mb-3">
                <Col className="col-10 text-muted">
                  <p
                    className="mb-0"
                    style={{
                      float: "right",
                    }}
                  >
                    Search for leads:
                  </p>
                </Col>
                <Col className="col-1">
                  <a
                    href="/search"
                    className="btn-sm"
                    variant="success"
                    type="btn"
                    style={{
                      border: "1px solid rgb(194, 189, 189)",
                      background: "green",
                      borderRadius: "5px",
                    }}
                  >
                    <i className="bi bi-search text-white ms-2"></i>
                  </a>
                </Col>
              </Row>
              <Row
                style={{
                  borderTop: "1px solid rgb(194, 189, 189)",
                  borderBottom: "1px solid rgb(194, 189, 189)",
                }}
              >
                <h5 className="text-muted mt-2 mb-2">Summary</h5>
                <Col className="summaries">
                  <p className="summary-figure text-info">
                    {totalLeadsCount(leads.leads)}
                  </p>
                  <p className="summary-title">Total Leads</p>
                </Col>
                <Col className="summaries">
                  <p className="summary-figure text-warning">
                    {assignedLeadsCount(leads.leads)}
                  </p>
                  <p className="summary-title">Assigned Leads</p>
                </Col>
                <Col className="summaries">
                  <p className="summary-figure text-success">
                    {closedLeadsCount(leads.leads)}
                  </p>
                  <p className="summary-title">Closed Leads</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="leads-details">
            <Col style={{ marginLeft: "10px" }}>
              <h5 className="text-muted mt-2 mb-3">Selected Lead details</h5>
              <Row>
                <Form id="myForm">
                  <Row>
                    <Col>
                      <HomeInput
                        label="Lead Id"
                        type="text"
                        value={leadId}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Business"
                        type="text"
                        value={singleLeadItem.business_name}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Industry"
                        type="text"
                        value={singleLeadItem.industry}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Contact Person"
                        type="text"
                        value={singleLeadItem.contact_person}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Email"
                        type="email"
                        value={singleLeadItem.contact_email}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Phone"
                        type="text"
                        value={singleLeadItem.contact_number}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Region"
                        type="text"
                        value={singleLeadItem.region}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Created by"
                        type="text"
                        value={singleLeadItem.created_by}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Department"
                        type="text"
                        value={singleLeadItem.creator_department}
                        onChange={(e) => {}}
                        required
                      />
                    </Col>
                    <Col>
                      <HomeInput
                        label="Service"
                        type="text"
                        value={singleLeadItem.service_type}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Sub-Type"
                        type="text"
                        value={singleLeadItem.service_subtype}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Status"
                        type="text"
                        value={singleLeadItem.status}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Assigned to"
                        value={singleLeadItem.sales_person}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Notes"
                        as="textarea"
                        row="5"
                        type="text"
                        value={singleLeadItem.notes}
                        onChange={(e) => {}}
                        required
                      />
                      <HomeInput
                        label="Close Remarks"
                        as="textarea"
                        row="3"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                  <Button
                    className="btn-sm"
                    variant="success"
                    type="submit"
                    style={{ width: "160px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      updateLead();
                      setTimeout(() => {
                        reload();
                      }, 1500);
                    }}
                  >
                    Close Lead
                  </Button>
                </Form>
              </Row>
            </Col>
            <Col className="scroller table-container-closed">
              <h5 className="text-muted mt-2 mb-3">Your Closed Deals</h5>
              <Table striped bordered hover size="sm" className="table">
                <thead className="table-head">
                  <tr>
                    <th>Lead ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Business</th>
                    <th>Industy</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Sub Type</th>
                    <th>Region</th>
                    <th>created_By</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{renderClosedLeads(leads.leads)}</tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};
