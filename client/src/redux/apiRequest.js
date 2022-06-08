import {
  GetUsersStart,
  GetUsersSuccess,
  GetUsersError,
  GetUserStart,
  GetUserSuccess,
  GetUserError,
  GetClassesStart,
  GetClassesError,
  GetClassesSuccess,
  GetClassStart,
  GetClassError,
  GetClassSuccess,
  GetSubjectsStart,
  GetSubjectsError,
  GetSubjectsSuccess,
  GetSubjectStart,
  GetSubjectError,
  GetSubjectSuccess,
  GetMySubjectStart,
  GetMySubjectError,
  GetMySubjectSuccess,
} from "./userSlice";

import {
  GetMeStart,
  GetMeError,
  GetMeSuccess,
  loginStart,
  // eslint-disable-next-line no-unused-vars
  loginFailed,
  loginSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./authSlice";

import { ShowAlert, HideAlert } from "./alertSlice";

import axios from "axios";

axios.defaults.withCredentials = true;

// const link = "https://apistudentstlu.herokuapp.com";
const link = "";

const ErrorMessage = (dispatch, error) => {
  dispatch(ShowAlert(error.response.data));
  const timeoutID = window.setTimeout(() => {
    dispatch(HideAlert());
  }, 3000);
  return () => window.clearTimeout(timeoutID);
};

// All Users
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(loginSuccess(res.data));
    dispatch(ShowAlert(res.data));
    navigate("/");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

export const logOutUser = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    const res = await axios.get(`${link}/v1/user/logout`);
    dispatch(logOutSuccess());
    dispatch(ShowAlert(res.data));
    navigate("/");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export const GetMe = async (dispatch) => {
  dispatch(GetMeStart());
  try {
    const res = await axios.get(`${link}/v1/user/me`);
    dispatch(GetMeSuccess(res.data));
  } catch (error) {
    dispatch(GetMeError());
  }
};

export const UpdateMe = async (dispatch, data, type, navigate) => {
  dispatch(GetMeStart());
  try {
    const url =
      type === "password"
        ? `${link}/v1/user/updateMyPassword`
        : `${link}/v1/user/updateInfo`;

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    dispatch(GetMeSuccess(res.data));
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetMeError());
    ErrorMessage(dispatch, error);
  }
};

// Admin
export const GetAllUsers = async (dispatch, type) => {
  dispatch(GetUsersStart());
  try {
    const url = type ? `${link}/v1/user?role=${type}` : `${link}/v1/user/`;
    const res = await axios.get(url);
    dispatch(GetUsersSuccess(res.data));
  } catch (error) {
    dispatch(GetUsersError());
  }
};

export const GetAUser = async (dispatch, id) => {
  dispatch(GetUserStart());
  try {
    const res = await axios.get(`${link}/v1/user/${id}`);
    if (res.data.status === "error") {
      dispatch(GetUserError());
    } else {
      dispatch(GetUserSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetUserError());
    ErrorMessage(dispatch, error);
  }
};

export const UpdateUser = async (dispatch, id, data) => {
  dispatch(GetUserStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/user/${id}`,
      data,
    });
    dispatch(ShowAlert(res.data));
    dispatch(GetUserSuccess(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetUserError());
    ErrorMessage(dispatch, error);
  }
};

export const AddNewUser = async (dispatch, data, navigate, role) => {
  try {
    const res = await axios.post(`${link}/v1/user/`, data);
    if (role === "admin") {
      navigate("/AD/Users");
      dispatch(ShowAlert(res.data));
      const timeoutID = window.setTimeout(() => {
        dispatch(HideAlert());
      }, 3000);
      return () => window.clearTimeout(timeoutID);
    } else {
      window.location.reload();
    }
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

// Teacher
export const GetMyClass = async (dispatch, id) => {
  dispatch(GetClassesStart());
  try {
    const res = await axios.get(`${link}/v1/class/MyClass`);
    if (res.data.results === 0) {
      dispatch(GetClassesError());
    } else {
      dispatch(GetClassesSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetClassesError());
  }
};

export const GetMySubject = async (dispatch) => {
  dispatch(GetSubjectsStart());
  try {
    const res = await axios.get(`${link}/v1/subject/MySubject`);
    if (res.data.results === 0) {
      dispatch(GetSubjectsError());
    } else {
      dispatch(GetSubjectsSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetSubjectsError());
  }
};

// Công tác sinh viên , lấy đa số hàm của admin và teacher

export const GetStudentTranscript = async (dispatch, id) => {
  dispatch(GetSubjectsStart());
  try {
    const res = await axios.get(`${link}/v1/transcript/Student/${id}`);
    if (res.data.results === 0) {
      dispatch(GetSubjectsError());
    } else {
      dispatch(GetSubjectsSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetSubjectsError());
  }
};

// Phòng khảo thí
export const GetAllSubject = async (dispatch) => {
  dispatch(GetSubjectsStart());
  try {
    const res = await axios.get(`${link}/v1/subject`);
    if (res.data.results === 0) {
      dispatch(GetSubjectsError());
    } else {
      dispatch(GetSubjectsSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetSubjectsError());
  }
};

export const GetAllStudentEd = async (dispatch, id) => {
  dispatch(GetUsersStart());
  try {
    const res = await axios.get(`${link}/v1/subjectEd/Student/${id}`);
    if (res.data.results === 0) {
      dispatch(GetUsersError());
    } else {
      dispatch(GetUsersSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetUsersError());
  }
};

export const UpdatePoint = async (dispatch, id, data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/subjectEd/${id}`,
      data,
    });
    // window.location.reload();
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

// Phòng đạo tạo

export const GetAllClass = async (dispatch, id) => {
  dispatch(GetClassesStart());
  try {
    const res = await axios.get(`${link}/v1/class`);
    if (res.data.results === 0) {
      dispatch(GetClassesError());
    } else {
      dispatch(GetClassesSuccess(res.data));
    }
    // const data = await res.data;
  } catch (error) {
    dispatch(GetClassesError());
  }
};

export const AddAClass = async (dispatch, data, navigate) => {
  try {
    await axios.post(`${link}/v1/class`, data);
    window.location.reload();
  } catch (error) {
    dispatch(ShowAlert(error.response.data));
    ErrorMessage(dispatch, error);
  }
};

export const GetClass = async (dispatch, id) => {
  dispatch(GetClassStart());
  try {
    const res = await axios.get(`${link}/v1/class/${id}`);
    if (res.data.status === "error") {
      dispatch(GetClassError());
    } else {
      dispatch(GetClassSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetClassError());
  }
};

export const UpdateClass = async (dispatch, id, data) => {
  try {
    dispatch(GetClassStart());
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/class/${id}`,
      data,
    });
    dispatch(ShowAlert(res.data));
    dispatch(GetClassSuccess(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetClassError());
    ErrorMessage(dispatch, error);
  }
};

export const AddASubject = async (dispatch, data) => {
  try {
    await axios.post(`${link}/v1/subject/`, data);
    window.location.reload();
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};
export const GetSubject = async (dispatch, id) => {
  dispatch(GetSubjectStart());
  try {
    const res = await axios.get(`${link}/v1/subject/${id}`);
    if (res.data.status === "error") {
      dispatch(GetSubjectError());
    } else {
      dispatch(GetSubjectSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetSubjectError());
  }
};

export const UpdateSubject = async (dispatch, id, data) => {
  dispatch(GetSubjectStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/subject/${id}`,
      data,
    });
    dispatch(ShowAlert(res.data));
    dispatch(GetSubjectSuccess(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetSubjectError());
    ErrorMessage(dispatch, error);
  }
};

// SINH VIÊN

//  mọi thứ
export const GetMyTranscript = async (dispatch) => {
  dispatch(GetMySubjectStart());
  try {
    const res = await axios.get(`${link}/v1/transcript/MyTranscript`);
    if (res.data.results === 0) {
      dispatch(GetMySubjectError());
    } else {
      dispatch(GetMySubjectSuccess(res.data));
    }
  } catch (error) {
    dispatch(GetMySubjectError());
  }
};
// Lấy các môn sinh viên đó chưa đăng kí, và đã đk nhưng chưa thi
export const GetNotMySubject = async (dispatch) => {
  dispatch(GetSubjectsStart());
  try {
    const res = await axios.get(`${link}/v1/subjectEd/NotMy`);
    dispatch(GetSubjectsSuccess(res.data));
  } catch (error) {
    dispatch(GetSubjectsError());
  }
};
export const GetMySubjectEd = async (dispatch) => {
  dispatch(GetMySubjectStart());
  try {
    const res = await axios.get(`${link}/v1/subjectEd/MyEd`);
    dispatch(GetMySubjectSuccess(res.data));
  } catch (error) {
    dispatch(GetMySubjectError());
  }
};

// Lấy các môn sinh viên đó đã thi và muốn nâng điểm
export const GetMySubjectPointEd = async (dispatch) => {
  dispatch(GetSubjectsStart());
  try {
    const res = await axios.get(`${link}/v1/subjectEd/MyEdPoint`);
    dispatch(GetSubjectsSuccess(res.data));
  } catch (error) {
    dispatch(GetSubjectsError());
  }
};

// Sinh viên đk học
export const StudentDKHoc = async (dispatch, data) => {
  try {
    await axios.post(`${link}/v1/subjectEd`, data);
    window.location.reload();
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};
export const StudentHuyDKHoc = async (dispatch, id) => {
  try {
    await axios.delete(`${link}/v1/subjectEd/${id}`);
    window.location.reload();
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

export const DangKiThiLai = async (dispatch, id, data) => {
  try {
    await axios({
      method: "PATCH",
      url: `${link}/v1/subjectEd/DKThiLai/${id}`,
      data,
    });
    window.location.reload();
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

// Thống kế
export const GetAllTranscript = async (dispatch) => {
  dispatch(GetUsersStart());
  try {
    const res = await axios.get(`${link}/v1/transcript`);
    dispatch(GetUsersSuccess(res.data));
  } catch (error) {
    dispatch(GetUsersError());
    ErrorMessage(dispatch, error);
  }
};
