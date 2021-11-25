import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type certificationState = {
  user:{username: string, uid: string, selfIntro: string,
}}

export type certificationState2 = {
  username: string,
  uid: string,
  selfIntro: string,
}

const initialState: certificationState = {
  user: {username: "", uid: "", selfIntro: "",}
} 

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<certificationState2>) => {
      state.user = action.payload;
    },
    logout:(state) => {
      state.user = {username:"", uid: "", selfIntro:""}
    }
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user
export default userSlice.reducer;
