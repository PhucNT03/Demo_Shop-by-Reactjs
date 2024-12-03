import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Nav from "./Nav";

function Admin() {
  const [toggle, setToggle] = useState(false);

  function Toggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div className="d-flex">
      <div className={toggle ? "d-none" : "w-auto position-fixed"}>
        <SideBar />
      </div>
      <div className={toggle ? "d-none" : "invisible"}>
        <SideBar />
      </div>
      <div className="col overflow-auto">
        <Nav Toggle={Toggle} className={toggle ? "collapsed" : ""} />
        <div className={`content ${toggle ? "collapsed" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
