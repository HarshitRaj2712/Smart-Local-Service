import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

let user = null;
let role = null;
let isAuthenticated = false;

if (token) {
  try {
    const decoded = jwtDecode(token);

    user = { id: decoded.id };
    role = decoded.role;
    isAuthenticated = true;
  } catch (error) {
    localStorage.removeItem("token");
  }
}

const initialState = {
  user,
  token,
  role,
  isAuthenticated,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;