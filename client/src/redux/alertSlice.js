import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    msg: "",
    type: "",
    show: false,
  },
  reducers: {
    ShowAlert: (state, action) => {
      return {
        ...state,
        show: true,
        type: action.payload.status,
        msg: action.payload.message,
      };
    },
    HideAlert: (state) => {
      return {
        ...state,
        show: false,
        type: "",
        msg: "",
      };
    },
  },
});

export const { ShowAlert, HideAlert } = alertSlice.actions;
export default alertSlice.reducer;
