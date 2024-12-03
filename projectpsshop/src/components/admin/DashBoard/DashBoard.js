import React from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

function DashBoard() {
  return (
    <div className="content p-3 bg-light dashboard-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <LineChart />
          </div>
          <div className="col-12 col-md-4 p-3">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
