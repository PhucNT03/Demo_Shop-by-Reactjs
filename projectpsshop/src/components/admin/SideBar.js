import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/admin.css";

import { Link } from "react-router-dom";
function SideBar() {
  const [active, setActive] = useState(1);

  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100">
      <div>
        <Link
          to="/admin/dashboard"
          href=""
          className="p-3 text-decoration-none text-white"
        >
          <i className="bi bi-code-slash fs-4 me-4"></i>
          <span className="fs-4">SideBar</span>
        </Link>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li
            className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(1)}
          >
            <span className="p-1 f-5">
              <i className="bi bi-speedometer2 me-3 fs-5"></i>
              <Link to="/admin/dashboard" className="fs-5">
                DashBoard
              </Link>
            </span>
          </li>
          <li
            className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(2)}
          >
            <span className="p-1">
              <i className="bi bi-boxes me-3 fs-5"></i>
              <Link to="/admin/productList" className="fs-5">
                Product
              </Link>
            </span>
          </li>
          {/* <li
            className={active === 3 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(3)}
          >
            <span className="p-1">
              <i className="bi bi-people me-3 fs-5"></i>
              <Link to="/admin/users" className="fs-5">
                User
              </Link>
            </span>
          </li> */}
          {/* <li
            className={active === 4 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(4)}
          >
            <span className="p-1">
              <i className="bi bi-table me-3 fs-5"></i>
              <Link to="/orders" className="fs-5">
                Orders
              </Link>
            </span>
          </li> */}
        </ul>
      </div>
      <div>
        <hr className="text-white"></hr>
        <div className="nav-item p-2">
          <span className="p-1 text-decoration-none text-white">
            <i className="bi bi-person-circle me-3 fs-5"></i>
            <span className="fs-4">
              <strong>Hieu</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
