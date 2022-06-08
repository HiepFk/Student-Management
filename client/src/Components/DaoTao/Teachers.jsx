import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsers, AddNewUser } from "../../redux/apiRequest";

import Loading from "../Loading";

const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authRole = useSelector((state) => state.auth?.me?.user?.role);
  const loading = useSelector((state) => state.user?.loading);
  const Users = useSelector((state) => state.user?.users?.data?.users);
  const [Id, setID] = useState("");

  const [teachers, setTeachers] = useState(Users);

  useEffect(() => {
    GetAllUsers(dispatch, "teacher");
  }, [dispatch]);

  useEffect(() => {
    setTeachers(Users);
  }, [Users]);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [cmnd, setCmnd] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [number, setNumber] = useState("");
  const [img, setImg] = useState(
    "https://res.cloudinary.com/hieptlu/image/upload/v1642152478/default_ohcoqq.jpg"
  );
  const role = "teacher";
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
        setImg(reader.result);
      };
    }
  };

  const handeAddUser = (e) => {
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
      role,
      photo: img,
      password,
      passwordConfirm,
    };
    if (
      user.photo ===
      "https://res.cloudinary.com/hieptlu/image/upload/v1642152478/default_ohcoqq.jpg"
    ) {
      delete user.photo;
    }
    AddNewUser(dispatch, user, navigate, authRole);
  };

  const handeSearch = (e) => {
    e.preventDefault();
    navigate(`/DT/Teachers/${Id}`);
  };

  if (loading || !teachers) {
    return <Loading />;
  }
  return (
    <div className="body_left">
      <div className="body_title">Tìm Kiếm Giáo viên</div>
      <div className="body_wrapper">
        <form className="info_form mini_wrapper" onSubmit={handeSearch}>
          <div className="info_container">
            <label className="info_label">Mã giáo viên: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter Name"
              onChange={(e) => setID(e.target.value)}
            />
          </div>
          <button type="submit" value="" className="info_btn search_btn">
            Tìm kiếm
          </button>
        </form>

        <table>
          <tr>
            <th>STT</th>
            <th>Mã giáo viên</th>
            <th>Tên giáo viên</th>
            <th>Ảnh</th>
          </tr>
          {teachers
            ? teachers.map((item, index) => {
                const { _id, Id_User, name, photo } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{Id_User}</td>
                    <td>{name}</td>
                    <td>
                      <img src={photo} alt="" className="user_img" />
                    </td>
                    <Link className="detail btn_about" to={Id_User || ""}>
                      About
                    </Link>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
      <div className="body_title">Thêm giáo viên</div>
      <div className="body_wrapper">
        <form className="info_form" onSubmit={handeAddUser}>
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
            <input type="text" className="info_input" value="teacher" />
          </div>

          <div className="info_container">
            <label className="info_label">Mật khẩu : </label>
            <input
              type="password"
              minLength="8"
              className="info_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Xác nhận lại mật khẩu : </label>
            <input
              type="password"
              minLength="8"
              className="info_input"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="info_container">
            <img src={img} alt="" className="info_img" />
            <input
              type="file"
              className="info_upload"
              id="photo"
              onChange={handleProductImageUpload}
            />
            <label className="info_label" for="photo">
              Chọn ảnh đại diện khác
            </label>
          </div>
          <button type="submit" value="" className="info_btn">
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default Teachers;
