// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: `login`,
//   initialState: {
//     user:{email:"", password:""},
//   }
// })

import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "counter",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    login: (state) => {
      console.log(state)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
});
