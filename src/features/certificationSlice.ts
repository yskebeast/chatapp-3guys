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

interface certificationState {
  text: string
}

const initialState: certificationState = {
  text: ""
} as certificationState

export const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    email: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    password: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { email, password, error } = certificationSlice.actions;
export const selectText = (state: RootState) => state.certification.text
export default certificationSlice.reducer;