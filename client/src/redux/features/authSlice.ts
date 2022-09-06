import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
