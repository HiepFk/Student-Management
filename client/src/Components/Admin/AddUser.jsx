import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddNewUser } from "../../redux/apiRequest";

export default function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authRole = useSelector((state) => state.auth.me?.data?.user?.role);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [cmnd, setCmnd] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/hieptlu/image/upload/v1642152478/default_ohcoqq.jpg"
  );
  const [role, setRole] = useState("student");
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
      photo,
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

  return (
    <div className="body_left">
      <h1 className="info_title">Thêm người dùng</h1>
      <div className="info_wrapper">
        <form className="info_form" onSubmit={handeAddUser}>
          <div className="info_container">
            <label className="info_label">Mã người dùng: </label>
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
            <label className="info_label">Quyền : </label>
            <select
              name="languages"
              id="lang"
              className="info_input"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="student">Sinh viên</option>
              <option value="teacher">Giáo viên</option>
              <option value="phongDaoTao">Nhân viên phòng đào tạo</option>
              <option value="phongKhaoThi">Nhân viên phòng khảo thí</option>
              <option value="phongCtsv">
                Nhân viên phòng công tác sinh viên
              </option>
              <option value="admin">Admin</option>
            </select>
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
            <img src={photo} alt="" className="info_img" />
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
            Thêm người dùng
          </button>
        </form>
      </div>
    </div>
  );
}
