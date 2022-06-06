import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { generalLink } from "../utils/links";

export default function Navbar({ links, title }) {
  return (
    <Wrapper className="body_right">
      <NavInfo>Toàn Trường</NavInfo>
      {generalLink.map((item) => {
        const { id, url, text } = item;
        return (
          <NavLink key={id}>
            <Link to={url}>{text}</Link>
          </NavLink>
        );
      })}
      <NavInfo>{title}</NavInfo>
      {links.map((item) => {
        const { id, url, text } = item;
        return (
          <NavLink key={id}>
            <Link to={url}>
              <div className="nav_text">{text}</div>
            </Link>
          </NavLink>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
  margin-top: 1rem;
  width: 12rem;
  margin-bottom: 5rem;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.452);
`;
const NavInfo = styled.div`
  padding: 10px;
  background-color: aliceblue;
  border-bottom: 4px solid white;
  background-color: rgb(119, 186, 245);
  font-weight: bold;
  font-size: 0.9rem;
`;
const NavLink = styled.div`
  padding: 10px;
  background-color: aliceblue;
  border-bottom: 4px solid white;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.25s linear;
  :hover {
    background-color: rgba(169, 211, 247, 0.63);
  }
`;
