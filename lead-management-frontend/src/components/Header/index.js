import React from "react";
import { Navbar } from "react-bootstrap";
import "../../assets/css/Header.css";
import logo from "../../assets/images/safaricom-Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";

/**
 * @author
 * @function Header
 **/

export const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const userName = auth.user.firstname;
  const lastName = auth.user.lastname;
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar className="navbar fixed-top">
        <Navbar.Brand href="/" className="brand">
          <img src={logo} className="nav-logo" alt="" />
          Enterprise Leads Management Tool
        </Navbar.Brand>
        <Navbar.Toggle>test</Navbar.Toggle>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="user">
            Welcome: {userName} {lastName}
          </Navbar.Text>
          <Navbar.Text>
            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
