import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = localStorage.getItem("token") || "";

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
