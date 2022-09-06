import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

const initialState: User = {  id: "", username: "", room: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log({ action: action });
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
