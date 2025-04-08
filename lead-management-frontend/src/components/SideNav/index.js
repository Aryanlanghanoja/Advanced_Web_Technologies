import React from "react";
import "../../assets/css/SideNav.css";
import { useSelector } from "react-redux";

/**
 * @author
 * @function SideNav
 **/

export const SideNav = (props) => {
  const userAccess = useSelector((state) => state.auth.user.access);

  const Rule = ({ color }) => (
    <hr
      style={{
        backgroundColor: color,
        height: "1px",
      }}
    />
  );

  if (userAccess === "sales") {
    return (
      <>
        <div className="sidenav sidenav-a" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
            Search
          </a>
          <a href="/">
            <i className="bi bi-house-fill"></i>
            Sales Workspace
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
            Lead Capture
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
            Lead Tracker
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
            Dashboard
          </a>
        </div>
        <div className="sidenav sidenav-i" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
          </a>
          <a href="/">
            <i className="bi bi-house-fill"></i>
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
          </a>
        </div>
      </>
    );
  } else if (userAccess === "admin") {
    return (
      <>
        <div className="sidenav sidenav-a" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
            Search
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
            Lead Capture
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
            Lead Tracker
          </a>
          <a href="/">
            <i className="bi bi-folder-check"></i>
            Administration
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
            Dashboard
          </a>
        </div>
        <div className="sidenav sidenav-i" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
          </a>
          <a href="/">
            <i className="bi bi-folder-check"></i>
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
          </a>
        </div>
      </>
    );
  } else if (userAccess === "superuser") {
    return (
      <>
        <div className="sidenav sidenav-a" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
            Search
          </a>
          <a href="/">
            <i className="bi bi-house-fill"></i>
            Sales Workspace
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
            Lead Capture
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
            Lead Tracker
          </a>
          <a href="/administration">
            <i className="bi bi-folder-check"></i>
            Administration
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
            Dashboard
          </a>
          <a href="/register">
            <i className="bi bi-person-plus-fill"></i>
            Register New User
          </a>
        </div>
        <div className="sidenav sidenav-i" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
          </a>
          <a href="/">
            <i className="bi bi-house-fill"></i>
          </a>
          <a href="/leadcapture">
            <i className="bi bi-menu-button-wide-fill"></i>
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
          </a>
          <a href="/administration">
            <i className="bi bi-folder-check"></i>
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
          </a>
          <a href="/register">
            <i className="bi bi-person-plus-fill"></i>
          </a>
        </div>
      </>
    );
  } else if (userAccess === "user") {
    return (
      <>
        <div className="sidenav sidenav-a" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
            Search
          </a>
          <a href="/">
            <i className="bi bi-menu-button-wide-fill"></i>
            Lead Capture
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
            Lead Tracker
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
            Dashboard
          </a>
        </div>
        <div className="sidenav sidenav-i" style={{ width: props.width }}>
          <a href="#section" className="closebtn" onClick={props.closeNav}>
            <i className="bi bi-x-square"></i>
          </a>
          <Rule color="gray" />
          <a href="/search">
            <i className="bi bi-search"></i>
          </a>
          <a href="/">
            <i className="bi bi-menu-button-wide-fill"></i>
          </a>
          <a href="/leadtracker">
            <i className="bi bi-list-stars"></i>
          </a>
          <a href="/dashboard">
            <i className="bi bi-clipboard-data"></i>
          </a>
        </div>
      </>
    );
  }
};
