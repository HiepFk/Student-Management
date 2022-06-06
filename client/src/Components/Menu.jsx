import React from "react";
import styled from "styled-components";

export default function Menu() {
  return (
    <Wrapper>
      <Item
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      >
        Trang Chủ Đăng kí học
      </Item>
      <Href href="https://thanglong.edu.vn/" className="menu_item">
        Trang chủ nhà trường
      </Href>
      <Href href="/" className="menu_item">
        Trang chủ quản lý đào tạo
      </Href>
      <Item
        style={{
          fontWeight: "bold",
          color: "red",
        }}
      >
        Có 0 tin báo mới
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;
  margin-left: 10rem;
  display: flex;
`;
const Item = styled.div`
  padding: 5px 10px;
  background-color: #d3dde0;
  color: black;
  border: 1.5px solid white;
  font-size: 1rem;
`;
const Href = styled.a`
  padding: 5px 10px;
  background-color: #d3dde0;
  color: black;
  border: 1.5px solid white;
  font-size: 1rem;
`;
