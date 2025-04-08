import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Input } from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import { userRegister } from "../../actions";

/**
 * @author
 * @function Register
 **/

export const Register = (props) => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ekno, setEkNo] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [access, setAccess] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstname", firstname);
    form.append("lastname", lastname);
    form.append("email", email);
    form.append("password", password);
    form.append("ekno", ekno);
    form.append("division", division);
    form.append("department", department);
    form.append("role", role);
    form.append("region", region);
    form.append("access", access);

    const update = {
      firstname,
      lastname,
      email,
      password,
      ekno,
      division,
      department,
      role,
      region,
      access,
    };
    if (
      !update.firstname ||
      !update.lastname ||
      !update.email ||
      !update.password ||
      !update.ekno ||
      !update.division ||
      !update.department ||
      !update.role ||
      !update.region ||
      !update.access
    ) {
      document.getElementById("msg").innerHTML = "Please fill all fields";
      document.getElementById("msg").classList.add("error");
    } else {
      dispatch(userRegister(update));
      document.getElementById("msg").innerHTML = "User successfully created";
      document.getElementById("msg").classList.add("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setEkNo("");
      setDivision("");
      setDepartment("");
      setRole("");
      setRegion("");
      setAccess("");
    }
  };

  return (
    <Layout>
      <div
        className=""
        style={{
          borderTop: "1px solid #efefef",
          marginRight: "20px",
        }}
      >
        <Row style={{ borderTop: "1px solid #efefef", position: "relative" }}>
          <Col
            style={{
              margin: "auto",
              width: "30%",
              position: "fixed",
              left: "30%",
              zIndex: "2",
              textAlign: "center",
              top: "15%",
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px gray",
            }}
          >
            <div style={{ margin: "auto" }}>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  color: "gray",
                  margin: "0px",
                }}
              >
                Register New User
              </p>
            </div>

            <Form
              // onSubmit={userLogin}
              style={{ margin: "auto", maxWidth: "300px" }}
            >
              <Row>
                <Col>
                  <Input
                    placeholder="First Name"
                    type="text"
                    value={firstname}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    value={lastname}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                placeholder="Enter email"
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                class=""
                placeholder="Password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Row>
                <Col md={4}>
                  <Input
                    placeholder="Staff ID"
                    type="text"
                    value={ekno}
                    required
                    onChange={(e) => setEkNo(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    placeholder="Division"
                    type="text"
                    value={division}
                    required
                    onChange={(e) => setDivision(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                class=""
                placeholder="Department"
                type="text"
                value={department}
                required
                onChange={(e) => setDepartment(e.target.value)}
              />
              <Input
                class="mb-3"
                placeholder="Role"
                type="text"
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
              />
              <Row>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    className="mb-4 form"
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
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    className=" mb-4 form"
                    style={{ fontSize: "12px" }}
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                    required
                  >
                    <option>Select Acces Type</option>
                    <option value="user">User</option>
                    <option value="admin">admin</option>
                    <option value="sales">sales</option>
                  </Form.Select>
                </Col>
              </Row>
              <Button
                className="mb-3"
                variant="success"
                type="submit"
                onClick={registerUser}
              >
                Register
              </Button>
            </Form>
            <p className="mt-3 text-center" id="msg"></p>
            {/* <p value={error} onChange={(e) => setError(e.target.value)}></p> */}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
