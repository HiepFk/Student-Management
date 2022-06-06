import React from "react";
import styled from "styled-components";
import loading from "../images/loading.gif";
function Loading() {
  const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;
  return (
    <div className="body_left">
      <Img src={loading} alt="loading" />;
    </div>
  );
}

export default Loading;
