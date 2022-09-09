import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTokenValid } from "../../services/tokenService";

const initialState: boolean = isTokenValid(localStorage.getItem("token"));

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      // console.log({authPayload: action.payload});      
      return action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
