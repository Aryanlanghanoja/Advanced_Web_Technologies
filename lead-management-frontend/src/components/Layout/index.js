import React, { useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { SideNav } from "../../components/SideNav";
import {
  GetData,
  GetDateData,
  GetRegionData,
  GetSsubData,
  GetStatusData,
} from "../Charts";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  const [wid, setWid] = useState("0%");
  const closeSidenav = () => {
    setWid("0%");
  };
  const openSidenav = () => {
    setWid("20%");
  };
  return (
    <div style={{ marginLeft: wid }}>
      <Header></Header>
      <i className="bi bi-three-dots" onClick={openSidenav}></i>
      <SideNav width={wid} closeNav={closeSidenav} />
      <GetData />
      <GetDateData />
      <GetRegionData />
      <GetSsubData />
      <GetStatusData />
      {props.children}
      <Footer></Footer>
    </div>
  );
};

// export default Layout;
