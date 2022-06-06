import React from "react";

function Alerts({ msg, type }) {
  return <div className={`alert ${type}`}>{msg}</div>;
}

export default Alerts;
