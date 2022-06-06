import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";

import { GetAUser, UpdateUser } from "../../redux/apiRequest";
const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.auth.me);
  const authRole = userLogin?.data?.user?.role;
  const { loading, error } = useSelector((state) => state.user, shallowEqual);
  const user = useSelector((state) => state.user?.user?.data?.user);

  const [_id, set_Id] = useState(user?._id);
  const [name, setName] = useState(user?.name);
  const [Id, setId] = useState(user?.Id_User);
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

  const handeUpdateInfo = (e) => {
    e.preventDefault();
    const user = {
      name,
      Id_User: Id,
      cmnd,
      sex,
      email,
      adress,
      birth,
      number,
      role,
      photo,
      type: "info",
    };
    UpdateUser(dispatch, _id, user);
  };
  const handeUpdatePassword = (e) => {
    e.preventDefault();
    const data = {
      password,
      passwordConfirm,
      type: "password",
    };
    UpdateUser(dispatch, _id, data);
    setPassword("");
    setPasswordConfirm("");
  };

  useEffect(() => {
    GetAUser(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    set_Id(user?._id);
    setName(user?.name);
    setId(user?.Id_User);
    setCmnd(user?.cmnd);
    setSex(user?.sex);
    setEmail(user?.email);
    setAddress(user?.adress);
    setBirth(user?.birth);
    setNumber(user?.number);
    setClass(user?.class?.name || "");
    setTeacher(user?.teacher?.name || "");
    setPhoto(user?.photo);
    setRole(user?.role);
  }, [user]);

  if (loading) {
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
              value={Id}
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
          {role === "student" &&
            (authRole === "phongCtsv" || authRole === "phongDaoTao") && (
              <>
                <div className="info_container">
                  <label className="info_label">Lớp : </label>
                  <input
                    type="text"
                    className="info_input"
                    value={Class}
                    onChange={(e) => setClass(e.target.value)}
                  />
                </div>
                <div className="info_container">
                  <label className="info_label">Giáo viên chủ nhiệm : </label>
                  <input
                    type="text"
                    className="info_input"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
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

          {(authRole === "phongCtsv" ||
            authRole === "admin" ||
            authRole === "phongDaoTao") && (
            <>
              <button type="submit" value="" className="info_btn">
                Cập nhật người dùng
              </button>
            </>
          )}
        </form>
      </div>
      {(authRole === "phongCtsv" ||
        authRole === "admin" ||
        authRole === "phongDaoTao") && (
        <>
          <h1 className="info_title">Mật khẩu người dùng</h1>
          <div className="info_wrapper">
            <form className="info_form" onSubmit={handeUpdatePassword}>
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
        </>
      )}
    </div>
  );
};

export default Update;
