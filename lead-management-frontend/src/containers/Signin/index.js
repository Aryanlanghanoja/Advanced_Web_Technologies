import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import image from "../../assets/images/landing_page_image.png";
import { Input } from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";

/**
* @author
* @function Signin

**/

export const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  return (
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
              fontSize: "40px",
              fontWeight: "600",
              color: "gray",
              margin: "0px",
            }}
          >
            Enterprise Leads
          </p>
          <p
            style={{
              fontSize: "40px",
              fontWeight: "600",
              color: "green",
              marginLeft: "10px",
            }}
          >
            Management Tool
          </p>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "gray",
              margin: "0px",
              letterSpacing: "4px",
            }}
          >
            MAXIMIZING CUSTOMER TOUCHPOINTS
          </p>
        </div>

        <Form
          onSubmit={userLogin}
          style={{ margin: "auto", maxWidth: "300px" }}
        >
          <Input
            id=""
            placeholder="Enter email"
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            class="mb-3"
            id="formBasicPassword"
            placeholder="Password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="success" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-danger mt-3">{auth.message}</p>
      </Col>
      <Col md={6} style={{ position: "fixed", zIndex: "1", right: "0px" }}>
        <img
          src={image}
          alt=""
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "1100px",
            margin: "auto",
            paddingBottom: "20px",
          }}
        />
      </Col>
    </Row>
  );
};
