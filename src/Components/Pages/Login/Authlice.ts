import { createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  getTokenExpiry,
  removeTokenAndExpiry,
} from "../../Shared/AuthUtils";
import dayjs from "dayjs";

const initialState = {
  loggedIn: false,
};

export const AuthSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      removeTokenAndExpiry();
      state.loggedIn = false;
    },
    checkIsLoggedIn: (state) => {
      const hasToken = !!getToken();
      const isTokenActive = dayjs
        .unix(Number(getTokenExpiry()))
        .isAfter(dayjs());
      if (hasToken && isTokenActive) {
        state.loggedIn = true;
      }
    },
    // signedUp
    // take user signup flow!
  },
});

export const { login, logout, checkIsLoggedIn } = AuthSlice.actions;

export default AuthSlice.reducer;
