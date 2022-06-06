import React from "react";
function Error() {
  return (
    <div className="body_left">
      <div
        style={{
          display: "flex",
          color: "#FF4C4C",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          ID bạn nhập không tồn tại
        </h1>
      </div>
    </div>
  );
}

export default Error;
