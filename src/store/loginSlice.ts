import { createSlice } from "@reduxjs/toolkit";

export type LoginObj = {
  isLogged: boolean;
  showInvalid: boolean;
};

const initialState: LoginObj = { isLogged: false, showInvalid: false };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
    toggleInvalid(state) {
      state.showInvalid = !state.showInvalid;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
