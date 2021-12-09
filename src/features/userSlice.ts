import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type certificationState = {
  user: { username: string; uid: string; selfIntro: string; birth: string };
};

export type certificationState2 = {
  username: string;
  uid: string;
  selfIntro: string;
  birth: string;
};

const initialState: certificationState = {
  user: { username: "", uid: "", selfIntro: "", birth: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<certificationState2>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { username: "", uid: "", selfIntro: "", birth: "" };
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },
    changeSelfIntro: (state, action: PayloadAction<string>) => {
      state.user.selfIntro = action.payload;
    },
    changeBirth: (state, action: PayloadAction<string>) => {
      state.user.birth = action.payload;
    },
  },
});

export const { login, logout, changeName, changeSelfIntro, changeBirth } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
