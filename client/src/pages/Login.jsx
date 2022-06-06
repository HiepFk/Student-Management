import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import logo_login from "../images/login_logo.jpg";
import wrapper from "../images/login_wrapper.jpg";
import styled from "styled-components";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);
  useEffect(() => {
    if (userLogin && userLogin?.user?.role === "student") {
      navigate("/SV");
    }
    if (userLogin && userLogin?.user?.role === "admin") {
      navigate("/AD");
    }
    if (userLogin && userLogin?.user?.role === "teacher") {
      navigate("/TC");
    }
    if (userLogin && userLogin?.user?.role === "phongCtsv") {
      navigate("/CT");
    }
    if (userLogin && userLogin?.user?.role === "phongDaoTao") {
      navigate("/DT");
    }
    if (userLogin && userLogin?.user?.role === "phongKhaoThi") {
      navigate("/KT");
    }
  }, [userLogin?.user?.role, userLogin, navigate]);

  const [Id_User, setId_User] = useState("");
  const [password, setPassword] = useState("");
  const handeSubmit = (e) => {
    e.preventDefault();
    const user = {
      Id_User,
      password,
    };
    loginUser(user, dispatch, navigate);
  };
  return (
    <Wrapper
      style={{
        background: `url(${wrapper}) no-repeat center/cover`,
      }}
    >
      <LoGin>
        <Content>
          <LoginImg src={logo_login} alt="" />
          <LoginTitle>Login</LoginTitle>
        </Content>
        <LoginForm onSubmit={handeSubmit}>
          <LoginContainer>
            <Label>
              <FaUser />
            </Label>
            <Input
              type="text"
              placeholder="Username"
              value={Id_User}
              onChange={(e) => setId_User(e.target.value)}
            />
          </LoginContainer>
          <LoginContainer>
            <Label>
              <FaLock />
            </Label>
            <Input
              type="password"
              className="login_input"
              minLength="8"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LoginContainer>
          <Btn type="submit">
            <FaArrowRight />
          </Btn>
        </LoginForm>
      </LoGin>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoGin = styled.div`
  width: 25rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;
const LoginImg = styled.img`
  margin-top: 2rem;
  width: 10rem;
  height: 10rem;
  border-radius: 10rem;
`;
const LoginTitle = styled.h1`
  font-size: 2.5rem;
`;
const LoginForm = styled.form`
  margin-bottom: 2rem;
`;
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;
const Input = styled.input`
  display: block;
  font-family: inherit;
  font-size: 1.5rem;
  color: inherit;
  padding: 0.5rem 1rem;
  border: none;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  border-radius: 4px;
  box-sizing: border-box;
  :focus {
    outline: none;
    border-bottom: 3px solid #55c57a;
  }
  :focus:invalid {
    border-bottom: 3px solid #ff7730;
  }
`;
const Label = styled.label`
  color: black;
  margin-bottom: 1rem;
  cursor: pointer;
  width: 100%;
  transform: translateX(3rem);
`;
const Btn = styled.button`
  margin-top: 1rem;
  width: 5rem;
  height: 4rem;
  border: 0;
  border-radius: 1rem;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  margin-left: 8rem;
  transition: all 0.5s linear;
  :hover {
    transform: translateX(1rem);
  }
`;
