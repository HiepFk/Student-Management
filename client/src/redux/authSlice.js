import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.me = action.payload;
      state.error = false;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOutSuccess: (state) => {
      state.loading = false;
      state.me = null;
      state.error = false;
    },
    logOutFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    GetMeStart: (state) => {
      state.loading = true;
    },
    GetMeError: (state) => {
      state.loading = false;
      // state.error = true;
    },
    GetMeSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.me = action.payload;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  GetMeStart,
  GetMeError,
  GetMeSuccess,
} = authSlice.actions;

export default authSlice.reducer;
