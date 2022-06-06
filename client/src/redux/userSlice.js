import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    subject: {},
    subjects: [],
    mySubject: [],
    class: {},
    classes: [],
    loading: false,
    error: false,
    msg: "",
  },
  reducers: {
    GetUsersStart: (state) => {
      return { ...state, loading: true };
    },
    GetUsersError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetUsersSuccess: (state, action) => {
      return { ...state, error: false, loading: false, users: action.payload };
    },
    GetUserStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetUserError: (state) => {
      return { ...state, error: true, loading: false };
    },

    GetUserSuccess: (state, action) => {
      return { ...state, error: false, loading: false, user: action.payload };
    },
    GetClassesStart: (state) => {
      return { ...state, loading: true };
    },
    GetClassesError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetClassesSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        classes: action.payload,
      };
    },
    GetClassStart: (state) => {
      return { ...state, loading: true };
    },
    GetClassError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetClassSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        class: action.payload,
      };
    },
    GetSubjectsStart: (state) => {
      return { ...state, loading: true };
    },
    GetSubjectsError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetSubjectsSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        subjects: action.payload,
      };
    },
    GetSubjectStart: (state) => {
      return { ...state, loading: true };
    },
    GetSubjectError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetSubjectSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        subject: action.payload,
      };
    },
    GetMySubjectStart: (state) => {
      return { ...state, loading: true };
    },
    GetMySubjectError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetMySubjectSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        mySubject: action.payload,
      };
    },
  },
});

export const {
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
} = userSlice.actions;
export default userSlice.reducer;
