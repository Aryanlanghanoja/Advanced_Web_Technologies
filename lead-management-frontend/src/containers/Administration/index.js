import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Row, Col, Button, Table, Form } from "react-bootstrap";
import { HomeInput } from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquare } from "react-bootstrap-icons";
import {
  getAllLeads,
  getSingleLead,
  leadUserSales,
  updateAssignLead,
} from "../../actions";
import "../../assets/css/Admin.css";

/**
 * @author
 * @function Administration
 **/

export const Administration = (props) => {
  const auth = useSelector((state) => state.auth);
  const leads = useSelector((state) => state.leads);
  const singleLeadItem = useSelector((state) => state.singleLead.singleLead);
  const assignSale = useSelector((state) => state.leadUsers);
  const dispatch = useDispatch();
  const _id = auth.user._id;
  const leadId = singleLeadItem.leadId;
  const [notes, setNotes] = useState("");
  const [assign, setAssign] = useState("");
  const [salesPersonId, setsalesPersonId] = useState("");

  const salesPersondetails = (e) => {
    const selectedSalesPerson = {};
    if (assign === "DISQUALIFIED") {
      selectedSalesPerson.sales_person = "N/A";
      selectedSalesPerson.sales_person_email = "N/A";
      selectedSalesPerson.sales_person_ekno = "N/A";
      selectedSalesPerson.sales_person_department = "N/A";
      selectedSalesPerson.sales_person_position = "N/A";
      document
        .getElementById("sales-person")
        .setAttribute("disabled", "disabled");
    } else if (assign === "ASSIGNED") {
      document.getElementById("sales-person").removeAttribute("disabled");
      for (let person of assignSale.leadUsers) {
        if (person._id === salesPersonId) {
          selectedSalesPerson.sales_person = `${person.firstname} ${person.lastname}`;
          selectedSalesPerson.sales_person_email = person.email;
          selectedSalesPerson.sales_person_ekno = person.ekno;
          selectedSalesPerson.sales_person_department = person.department;
          selectedSalesPerson.sales_person_position = person.role;
        }
      }
    }
    return selectedSalesPerson;
  };
  // console.log(salesPersondetails());

  const sales_person = salesPersondetails().sales_person;
  const sales_person_email = salesPersondetails().sales_person_email;
  const sales_person_ekno = salesPersondetails().sales_person_ekno;
  const sales_person_department = salesPersondetails().sales_person_department;
  const sales_person_position = salesPersondetails().sales_person_position;

  useEffect(() => {
    dispatch(getAllLeads());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getLeadId = (item) => {
    const leadPair = {};
    leadPair.leadId = item;
    return leadPair;
  };

  const getSalesPerson = (region) => {
    const keyPair = {};
    keyPair.region = region;
    keyPair.access = "sales";
    // console.log(keyPair);
    return keyPair;
  };

  const updateLead = (e) => {
    const form = new FormData();
    form.append("_id", _id);
    form.append("leadId", leadId);
    form.append("notes", notes);
    form.append("assign", assign);
    form.append("sales_person", sales_person);
    form.append("sales_person_email", sales_person_email);
    form.append("sales_person_ekno", sales_person_ekno);
    form.append("sales_person_department", sales_person_department);
    form.append("sales_person_position", sales_person_position);

    const update = {
      _id,
      leadId,
      notes,
      assign,
      sales_person,
      sales_person_email,
      sales_person_ekno,
      sales_person_department,
      sales_person_position,
    };
    dispatch(updateAssignLead(update));
  };

  const reload = (e) => {
    window.location.reload(false);
  };

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  const renderSalesPeople = (salesTeam) => {
    let salesPeople = [];
    for (let person of salesTeam) {
      salesPeople.push(
        <option key={person._id} value={person._id}>
          {person.firstname} {person.lastname}
        </option>
      );
    }
    return salesPeople;
  };

  const renderOpenLeads = (leads) => {
    let leadItem = [];
    for (let lead of leads) {
      if (lead.status === "OPEN") {
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
            <td>
              <p
                className="admin-edit mb-0"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(getSingleLead(getLeadId(lead.leadId)));
                  dispatch(leadUserSales(getSalesPerson(lead.region)));
                }}
              >
                <PencilSquare />
              </p>
            </td>
          </tr>
        );
      }
    }
    return leadItem;
  };

  const renderAssignedLeads = (leads) => {
    let leadItem = [];
    for (let lead of leads) {
      if (lead.status === "ASSIGNED") {
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

  // const NotificationMessage = (e) => {
  //   const message = JSON.parse(localStorage.getItem("assignMsg"));
  //   document.getElementById("msg").innerHTML = message;
  //   if (message === null) {
  //     return <p className="text-danger mt-2"></p>;
  //   } else {
  //     return <p className="text-danger mt-2" id="msg"></p>;
  //   }
  // };

  return (
    <Layout>
      <div
        className=""
        style={{
          borderTop: "1px solid #efefef",
          marginRight: "20px",
        }}
      >
        <Row>
          <Col>
            <h1
              style={{ marginLeft: "40px", marginTop: "60px", color: "gray" }}
            >
              Admin Page
            </h1>
          </Col>
          <Col
            className=""
            style={{
              marginRight: "10px",
              marginTop: "20px",
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
          </Col>
        </Row>
        <div
          style={{
            borderTop: "1px solid #efefef",
            margin: "30px 20px 0px 20px",
          }}
        >
          <Col className="scroller-admin mt-3 border">
            <Table striped bordered hover size="sm" className="table">
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
                  <th className="th">Edit</th>
                </tr>
              </thead>
              <tbody className="">{renderOpenLeads(leads.leads)}</tbody>
            </Table>
          </Col>
          <Row className="leads">
            <Col className="scroller-leads" style={{}}>
              <h5 className="text-muted mt-2 mb-3">Selected Lead details</h5>
              <Row>
                <Form>
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
                        label="Notes"
                        as="textarea"
                        row="5"
                        type="text"
                        value={singleLeadItem.notes}
                        onChange={(e) => {}}
                        required
                      />
                      <Form.Select
                        aria-label="Default select example"
                        className="form mb-2"
                        style={{ fontSize: "12px" }}
                        value={assign}
                        onChange={(e) => setAssign(e.target.value)}
                        required
                      >
                        <option>Select Status</option>
                        <option value="ASSIGNED">ASSIGN</option>
                        <option value="DISQUALIFIED">DISQUALIFY</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Default select example"
                        className="form mb-2"
                        style={{ fontSize: "12px" }}
                        value={salesPersonId}
                        onChange={(e) => setsalesPersonId(e.target.value)}
                        required
                        id="sales-person"
                      >
                        <option>Select Sales Person</option>
                        {renderSalesPeople(assignSale.leadUsers)}
                      </Form.Select>
                      <HomeInput
                        label="Remarks"
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
                    Submit
                  </Button>
                  {/* <p className="text-danger mt-2" id="msg"></p> */}
                  {/* <NotificationMessage /> */}
                </Form>
              </Row>
            </Col>
            <Col className="scroller">
              <h5 className="text-muted mt-2 mb-3">Assigned Deals</h5>
              <Col className="table-container-assigned">
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
                  <tbody>{renderAssignedLeads(leads.leads)}</tbody>
                </Table>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};
