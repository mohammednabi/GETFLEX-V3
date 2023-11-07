import { CreateSlice, createSlice } from "@reduxjs/toolkit";

export const toWatchSlice = createSlice({
  name: "toWatch",
  initialState: {
    value: localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies")).length
      : 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = toWatchSlice.actions;

export default toWatchSlice.reducer;
