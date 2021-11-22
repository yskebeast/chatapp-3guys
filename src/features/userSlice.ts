import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VFC } from "react";
import { RootState } from "../app/store";



// export const certificationSlice = createSlice({
//   name: "certification",
//   initialState: certificationState {
//     text: "",
//   },
//   reducers: {
//     email: (state, action) => {
//       state.text = action.payload;
//     },
//     password: (state, action) => {
//       state.text = action.payload;
//     },
//     error: (state, action) => {
//       state.text = action.payload;
//     },
//   },
// });

// export const { email, password, error } = certificationSlice.actions;

// export default certificationSlice.reducer;

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

export const { login } = userSlice.actions;
export const selectText = (state: RootState) => state.user.user
export default userSlice.reducer;
