import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCast = createAsyncThunk("getCast", async (id) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWQwNTJkYjE3NmYwNzBlZTY5ZThhYTNkNGMxNTlmNyIsInN1YiI6IjY1MWY3YmM2NzQ1MDdkMDBmZjk4Y2M0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dBFqY-1oACk5BYf4myVH6eMREfT7pUUf_I9hMxtjeCs",
    },
  };

  const response = await axios.request(options);

  return response.data;
});

const getCastSlice = createSlice({
  name: "getCast",
  initialState: {
    cast: [],
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getCast.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cast = action.payload.cast;
      });
  },
});

export default getCastSlice.reducer;
