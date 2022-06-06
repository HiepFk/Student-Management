import React from "react";
import styled from "styled-components";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  `;

  const Author = styled.span`
    font-weight: 600;
    margin: 5px;
  `;
  const Logo = styled.div`
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const Item = styled.a`
    font-size: 1.5rem;
    margin-right: 1rem;
  `;

  return (
    <>
      <Footer>
        &copy;{new Date().getFullYear()} by
        <Author>Nguyễn Huy Hiệp</Author>. All rights reserved.
      </Footer>
      <Logo>
        <Item href="https://www.facebook.com/hiepfk.128">
          <FaFacebook
            style={{
              color: "#319bf7",
            }}
          />
        </Item>
        <Item href="https://github.com/HiepFk">
          <FaGithub />
        </Item>
      </Logo>
    </>
  );
}
