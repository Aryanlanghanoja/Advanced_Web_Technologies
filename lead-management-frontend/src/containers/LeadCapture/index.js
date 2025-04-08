import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AddLead } from "../../actions";
import { Layout } from "../../components/Layout";
import { Input, Select } from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/css/LeadCapture.css";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

/**
 * @author
 * @function LeadCapture
 **/

export const LeadCapture = (props) => {
  const auth = useSelector((state) => state.auth);
  const _id = auth.user._id;
  const dispatch = useDispatch();
  const [business_name, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setEmail] = useState("");
  const [contact_number, setPhone] = useState("");
  const [service_type, setServiceType] = useState("");
  const [service_subtype, setSubType] = useState("");
  const [region, setRegion] = useState("");
  const [notes, setNotes] = useState("");

  const createLead = (e) => {
    // e.preventDefault();
    const form = new FormData();
    form.append("_id", _id);
    form.append("business_name", business_name);
    form.append("industry", industry);
    form.append("contact_person", contact_person);
    form.append("contact_email", contact_email);
    form.append("contact_number", contact_number);
    form.append("service_type", service_type);
    form.append("service_subtype", service_subtype);
    form.append("region", region);
    form.append("notes", notes);

    const lead = {
      _id,
      business_name,
      industry,
      contact_person,
      contact_email,
      contact_number,
      service_type,
      service_subtype,
      region,
      notes,
    };
    // console.log(lead);
    if (
      !lead.business_name ||
      !lead.industry ||
      !lead.contact_person ||
      !lead.contact_email ||
      !lead.contact_number ||
      !lead.service_type ||
      !lead.service_subtype ||
      !lead.region ||
      !lead.notes
    ) {
      document.getElementById("msg").innerHTML = "Please fill all fields";
      document.getElementById("msg").classList.add("error");
    } else {
      dispatch(AddLead(lead));
      document.getElementById("msg").innerHTML = "Lead successfully created.";

      document.getElementById("msg").classList.add("success");
      setBusinessName("");
      setIndustry("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setServiceType("");
      setSubType("");
      setRegion("");
      setNotes("");
    }
  };

  const updateLeadId = async (e) => {
    let post;
    try {
      post = JSON.parse(await AsyncLocalStorage.getItem("postId"));
      document.getElementById("createdLeadId").innerHTML =
        "The Lead Id for the created lead is - " + post;
    } catch (e) {}
    localStorage.removeItem("postId");
  };

  return (
    <Layout>
      <div className="" style={{ borderTop: "1px solid #efefef" }}>
        <h1 style={{ marginLeft: "40px", marginTop: "60px", color: "gray" }}>
          Leads Capture
        </h1>
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
        <div
          style={{
            borderTop: "1px solid #efefef",
            margin: "30px 20px 0px 20px",
          }}
        >
          <Form id="form" style={{ marginTop: "50px" }}>
            <Row>
              <Col>
                <Input
                  label="Business Name"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Business Name"
                  type="text"
                  value={business_name}
                  required
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <Input
                  label="Contact Person"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact Person"
                  type="text"
                  value={contact_person}
                  required
                  onChange={(e) => setContactPerson(e.target.value)}
                />
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3 form"
                  id=""
                  style={{ fontSize: "12px" }}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option>Select Region</option>
                  <option value="NAIROBI">NAIROBI</option>
                  <option value="MOUNTAIN">MOUNTAIN</option>
                  <option value="COAST">COAST</option>
                  <option value="RIFT">RIFT</option>
                  <option value="GREATER WESTERN">GREATER WESTERN</option>
                </Form.Select>
                <Button
                  className="btn-sm"
                  variant="success"
                  type="submit"
                  style={{ width: "160px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    createLead();
                    setTimeout(() => {
                      updateLeadId();
                    }, 1000);
                  }}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Input
                  label="Industry"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Industry"
                  type="text"
                  value={industry}
                  required
                  onChange={(e) => setIndustry(e.target.value)}
                />
                <Input
                  label="Contact Email"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact Email address"
                  type="email"
                  value={contact_email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Row>
                  <Col>
                    <Select label="Service Type" />
                    <Form.Select
                      aria-label="Default select example"
                      className="form"
                      style={{ fontSize: "12px" }}
                      value={service_type}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option>Select Service</option>
                      <option value="Fixed Data">Fixed Data</option>
                      <option value="GSM">GSM</option>
                      <option value="ICT">ICT</option>
                      <option value="MPESA">MPESA</option>
                      <option value="IoT">IoT</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Select label="Service Sub-Type" />
                    <Form.Select
                      aria-label="Default select example"
                      className="form"
                      style={{ fontSize: "12px" }}
                      value={service_subtype}
                      onChange={(e) => setSubType(e.target.value)}
                      required
                    >
                      <option>Select Sub-Type</option>
                      <option value="Fixed - Fibre">Fixed - Fibre</option>
                      <option value="Fixed - LTE">Fixed - LTE</option>
                      <option value="GSM - Mobile Data">
                        GSM - Mobile Data
                      </option>
                      <option value="GSM - Mobile Voice">
                        GSM - Mobile Voice
                      </option>
                      <option value="GSM - Bulk SMS">GSM - Bulk SMS</option>
                      <option value="GSM - SMS & VAS">GSM - SMS & VAS</option>
                      <option value="GSM - Roaming">GSM - Roaming</option>
                      <option value="GSM - Shiriki">GSM - Shiriki</option>
                      <option value="GSM - Corporate Value Pack">
                        GSM - Corporate Value Pack
                      </option>
                      <option value="GSM - Corporate Advantage">
                        GSM - Corporate Advantage
                      </option>
                      <option value="GSM - Education Data-Pass">
                        GSM - Education Data-Pass
                      </option>
                      <option value="ICT - Cloud">ICT - Cloud</option>
                      <option value="ICT - Collocation">
                        ICT - Collocation
                      </option>
                      <option value="ICT - Digital Service">
                        ICT - Digital Service
                      </option>
                      <option value="ICT - Managed Security">
                        ICT - Managed Security
                      </option>
                      <option value="ICT - Consulting">ICT - Consulting</option>
                      <option value="ICT - G-Suite">ICT - G-Suite</option>
                      <option value="ICT - Office 365">ICT - Office 365</option>
                      <option value="MPESA - Buy Goods Till">
                        MPESA - Buy Goods Till
                      </option>
                      <option value="MPESA - Paybil-C2B">
                        MPESA - Paybil-C2B
                      </option>
                      <option value="MPESA - Paybill-B2C">
                        MPESA - Paybill-B2C
                      </option>
                      <option value="MPESA - Paybil-B2B">
                        MPESA - Paybil-B2B
                      </option>
                      <option value="IoT - M-Gas">IoT - M-Gas</option>
                      <option value="IoT - Telematics">IoT - Telematics</option>
                      <option value="IoT - Smart-Water">
                        IoT - Smart-Water
                      </option>
                      <option value="IoT - Smart-Meter">
                        IoT - Smart-Meter
                      </option>
                      <option value="IoT - SIM Management">
                        IoT - SIM Management
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Input
                  label="Contact Phone"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Contact number"
                  type="text"
                  value={contact_number}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Additionl Notes"
                  as="textarea"
                  rows="5"
                  class="mb-3 form"
                  id=""
                  placeholder="Enter Notes"
                  type="text"
                  value={notes}
                  required
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          <p className="mt-3 text-center" id="msg"></p>
          <p
            className="mt-3 text-center text-info"
            id="createdLeadId"
            style={{ fontWeight: "bold" }}
          ></p>
        </div>
      </div>
    </Layout>
  );
};
