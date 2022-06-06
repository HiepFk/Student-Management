import React from "react";
import styled from "styled-components";
import error from "../images/error.gif";
function Error() {
  const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;
  return <Img src={error} alt="error" />;
}

export default Error;
