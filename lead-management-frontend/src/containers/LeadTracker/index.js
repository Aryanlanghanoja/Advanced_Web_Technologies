import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Input, TrackerElement } from "../../components/UI/Input";
import { searchLead } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/LeadTracker.css";
/**
 * @author
 * @function LeadTracker
 **/

export const LeadTracker = (props) => {
  const searchedLead = useSelector((state) => state.singleLead.singleLead);
  const [leadId, setLeadId] = useState("");
  const dispatch = useDispatch();

  const CreateDate = (e) => {
    function convertTZ(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      );
    }

    if (searchedLead.createdAt === undefined) {
      return (
        <TrackerElement label="Create Date:" entry={searchedLead.createdAt} />
      );
    } else {
      return (
        <TrackerElement
          label="Create Date:"
          entry={convertTZ(searchedLead.createdAt, "Africa/Nairobi")
            .toString()
            .substring(0, 24)}
        />
      );
    }
  };

  const search = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("leadId", leadId);

    const lead = {
      leadId,
    };
    dispatch(searchLead(lead));
  };

  const progressBtns = (e) => {
    if (searchedLead.status === "CLOSED") {
      document.getElementById("open").classList.add("stage-done");
      document.getElementById("qualified").classList.add("stage-done");
      document.getElementById("assigned").classList.add("stage-done");
      document.getElementById("closed").classList.add("stage-done");
      document
        .getElementById("disqualified")
        .classList.add("stage-disqualified");
    } else if (searchedLead.status === "ASSIGNED") {
      document.getElementById("open").classList.add("stage-done");
      document.getElementById("qualified").classList.add("stage-done");
      document.getElementById("assigned").classList.add("stage-working");
      document.getElementById("closed").classList.add("stage-yet");
      document
        .getElementById("disqualified")
        .classList.add("stage-disqualified");
    } else if (searchedLead.status === "OPEN") {
      document.getElementById("open").classList.add("stage-working");
      document.getElementById("qualified").classList.add("stage-yet");
      document.getElementById("assigned").classList.add("stage-yet");
      document.getElementById("closed").classList.add("stage-yet");
      document
        .getElementById("disqualified")
        .classList.add("stage-disqualified");
    } else if (searchedLead.status === "DISQUALIFIED") {
      document.getElementById("open").classList.add("stage-disqualified");
      document.getElementById("qualified").classList.add("stage-disqualified");
      document.getElementById("assigned").classList.add("stage-disqualified");
      document.getElementById("closed").classList.add("stage-disqualified");
      document.getElementById("disqualified").classList.add("stage-done");
    }
  };

  return (
    <Layout>
      <div className="" style={{ borderTop: "1px solid #efefef" }}>
        <h1 style={{ marginLeft: "40px", marginTop: "60px", color: "gray" }}>
          Leads Tracker
        </h1>
        <div
          style={{
            borderTop: "1px solid #efefef",
            margin: "30px 20px 0px 20px",
          }}
        >
          <div className="row">
            <div className="col-md-2">
              <Form style={{ marginTop: "50px" }}>
                <Row>
                  <Col className="">
                    <Input
                      label="Lead ID"
                      class="mb-3"
                      id=""
                      placeholder="Enter Lead ID"
                      type="text"
                      value={leadId}
                      required
                      onChange={(e) => setLeadId(e.target.value)}
                    />
                    <Button
                      className="btn-sm"
                      variant="success"
                      type="submit"
                      style={{ width: "150px" }}
                      onClick={search}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-9 " style={{ marginTop: "50px" }}>
              <p>
                The lead is currently at the{" "}
                <strong>{searchedLead.status}</strong> stage
              </p>
              <Button
                className="btn-sm col-md-2"
                variant="light"
                type="btn"
                id="disqualified"
              >
                Disqualified
              </Button>
              <Button
                className="btn-sm col-md-2 ms-3"
                variant="light"
                type="btn"
                id="open"
              >
                Open
              </Button>
              <Button
                className="btn-sm col-md-2 ms-3"
                variant="light"
                type="btn"
                id="qualified"
              >
                Qualified
              </Button>
              <Button
                className="btn-sm col-md-2  ms-3"
                variant="light"
                type="btn"
                id="assigned"
              >
                Assigned
              </Button>
              <Button
                className="btn-sm col-md-2  ms-3"
                variant="light"
                type="btn"
                id="closed"
              >
                Closed
              </Button>
            </div>
          </div>
          <div
            className="row"
            style={{ borderTop: "1px solid #efefef", marginTop: "30px" }}
          >
            <div className="col-md-4 mt-5">
              <TrackerElement
                label="Lead ID:"
                entry={searchedLead.leadId}
                onChange={progressBtns()}
              />
              <TrackerElement
                label="Business Name:"
                entry={searchedLead.business_name}
              />
              <TrackerElement label="Industry:" entry={searchedLead.industry} />
              <TrackerElement
                label="Contact Person:"
                entry={searchedLead.contact_person}
              />
              <TrackerElement
                label="Email:"
                entry={searchedLead.contact_email}
              />
              <TrackerElement
                label="Phone:"
                entry={searchedLead.contact_number}
              />
              <TrackerElement label="Region:" entry={searchedLead.region} />
              <TrackerElement
                label="Service Type:"
                entry={searchedLead.service_type}
              />
              <TrackerElement
                label="Sub type:"
                entry={searchedLead.service_subtype}
              />
            </div>
            <div className="col-md-4 mt-5">
              <TrackerElement
                label="Created by:"
                entry={searchedLead.created_by}
              />
              <CreateDate />
              <TrackerElement
                label="Creator Email:"
                entry={searchedLead.creator_email}
              />
              <TrackerElement
                label="Department:"
                entry={searchedLead.creator_department}
              />
              <TrackerElement
                label="Lead Status:"
                entry={searchedLead.status}
              />
              <TrackerElement
                label="Qualified by:"
                entry={searchedLead.assigned_by}
              />
              <TrackerElement
                label="Qualifier Email:"
                entry={searchedLead.assignor_email}
              />
              <TrackerElement
                label="Assigned to:"
                entry={searchedLead.sales_person}
              />
              <TrackerElement
                label="Assigned Email:"
                entry={searchedLead.sales_person_email}
              />
            </div>
            <div className="col-md-4 " style={{ marginTop: "50px" }}>
              <div className="mb-3 input-div">
                <label className="text-muted form-label details-label">
                  Notes:
                </label>
                <p
                  className=" form-control input-field"
                  id=""
                  style={{ height: "300px" }}
                >
                  {searchedLead.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
