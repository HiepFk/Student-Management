import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { logOutUser } from "../redux/apiRequest";
import logo from "../images/logo.svg";
export default function Header() {
  const user = useSelector((state) => state.auth?.me?.data?.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    setId(user?.Id_User);
    setImg(user?.photo);
  }, [user]);
  return (
    <HeaderCSS>
      <Left>
        <Img src={logo} alt="" />
        <Title>
          Hệ thống đăng kí học <Small>Online</Small>
        </Title>
      </Left>
      <Right>
        <Name>
          Xin chào <ID>{id}</ID>
        </Name>
        <Photo src={img} alt="" />
        <Logout type="button" onClick={() => logOutUser(dispatch, navigate)}>
          Logout
        </Logout>
      </Right>
    </HeaderCSS>
  );
}

const HeaderCSS = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;
const Left = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-direction: column;
`;
const Right = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;
const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-left: 0.5rem;
  transform: translateY(1rem);
  color: rgba(255, 0, 0, 0.7);
`;
const Small = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const Img = styled.img`
  margin-top: 1rem;
`;
const Photo = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  margin-right: 1rem;
`;
const Name = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 1rem;
  color: rgba(0, 0, 0, 0.7);
`;
const ID = styled.span`
  color: rgba(255, 0, 0, 0.7);
`;
const Logout = styled.button`
  background-color: rgba(255, 0, 0, 0.7);
  box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 6px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
`;
