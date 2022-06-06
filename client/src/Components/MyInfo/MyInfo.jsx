import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UpdateMe, GetMe } from "../../redux/apiRequest";
import Loading from "../Loading";
import Error from "../Error";

import "./app.css";
export default function MyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(loading);

  const user = useSelector((state) => state.auth?.me?.data?.user);

  const [name, setName] = useState(user?.name);
  const [id, setId] = useState(user?.Id_User);
  const [cmnd, setCmnd] = useState(user?.cmnd);
  const [sex, setSex] = useState(user?.sex);
  const [email, setEmail] = useState(user?.email);
  const [adress, setAddress] = useState(user?.adress);
  const [birth, setBirth] = useState(user?.birth);
  const [number, setNumber] = useState(user?.number);
  const [Class, setClass] = useState(user?.class?.name);
  const [teacher, setTeacher] = useState(user?.teacher?.name);
  const [photo, setPhoto] = useState(user?.photo);
  const [role, setRole] = useState(user?.role);
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };
  const TransformFileData = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
    } else {
      setPhoto(user?.photo);
    }
  };

  const handeUpdateInfo = async (e) => {
    e.preventDefault();
    const user = {
      name,
      Id_User: id,
      cmnd,
      sex,
      email,
      adress,
      birth,
      number,
      photo,
    };
    UpdateMe(dispatch, user, "info", navigate);
  };

  const handeUpdatePassword = (e) => {
    e.preventDefault();
    const data = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    UpdateMe(dispatch, data, "password", navigate);
    setPassword("");
    setPasswordConfirm("");
    setPasswordCurrent("");
  };

  useEffect(() => {
    GetMe(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setName(user?.name);
    setId(user?.Id_User);
    setCmnd(user?.cmnd);
    setSex(user?.sex);
    setEmail(user?.email);
    setAddress(user?.adress);
    setBirth(user?.birth);
    setNumber(user?.number);
    setClass(user?.class?.name);
    setTeacher(user?.teacher?.name);
    setPhoto(user?.photo);
    setRole(user?.role);
    setIsLoading(loading);
  }, [loading, user]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="body_left">
      <h1 className="info_title">Thông tin cá nhân</h1>
      <div className="info_wrapper">
        <form className="info_form" onSubmit={handeUpdateInfo}>
          <div className="info_container">
            <label className="info_label">ID : </label>
            <input
              type="text"
              className="info_input"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Name : </label>
            <input
              type="text"
              className="info_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Căn cước công dân : </label>
            <input
              type="text"
              className="info_input"
              value={cmnd}
              onChange={(e) => setCmnd(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Giới tính : </label>
            <input
              type="text"
              className="info_input"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Địa chỉ : </label>
            <input
              type="text"
              className="info_input"
              value={adress}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Ngày sinh : </label>
            <input
              type="text"
              className="info_input"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Số điện thoại : </label>
            <input
              type="text"
              className="info_input"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Email : </label>
            <input
              type="text"
              className="info_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Role : </label>
            <input
              type="text"
              className="info_input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          {role === "student" && (
            <>
              <div className="info_container">
                <label className="info_label">Lớp : </label>
                <input
                  type="text"
                  className="info_input"
                  defaultValue={Class}
                />
              </div>
              <div className="info_container">
                <label className="info_label">Giáo viên chủ nhiệm : </label>
                <input
                  type="text"
                  className="info_input"
                  defaultValue={teacher}
                />
              </div>
            </>
          )}
          <div className="info_container">
            <img src={photo} alt="" className="info_img" />
            <input
              type="file"
              className="info_upload"
              id="photo"
              name="photo"
              onChange={handleProductImageUpload}
            />
            <label className="info_label" for="photo">
              Chọn ảnh đại diện khác
            </label>
          </div>
          <button type="submit" className="info_btn">
            Cập nhật thông tin
          </button>
        </form>
      </div>
      <h1 className="info_title">Thông tin mật khẩu</h1>
      <div className="info_wrapper">
        <form className="info_form" onSubmit={handeUpdatePassword}>
          <div className="info_container">
            <label className="info_label">Mật khẩu hiện tại : </label>
            <input
              type="password"
              minLength="8"
              className="info_input"
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Mật khẩu mới : </label>
            <input
              type="password"
              minLength="8"
              className="info_input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Xác nhận lại mật khẩu : </label>
            <input
              type="password"
              minLength="8"
              className="info_input"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button type="submit" value="" className="info_btn">
            Cập nhật mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
