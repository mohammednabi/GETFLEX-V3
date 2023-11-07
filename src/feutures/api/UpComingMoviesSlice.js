import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUpComingMovies = createAsyncThunk(
  "getUpComingMovies",
  async (page) => {
    const url =
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWQwNTJkYjE3NmYwNzBlZTY5ZThhYTNkNGMxNTlmNyIsInN1YiI6IjY1MWY3YmM2NzQ1MDdkMDBmZjk4Y2M0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dBFqY-1oACk5BYf4myVH6eMREfT7pUUf_I9hMxtjeCs",
      },
    };

    const response = await axios.get(url, options);

    return response.data;
  }
);

const upComingMoviesSlice = createSlice({
  name: "upComingMovies",
  initialState: {
    movies: [],
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getUpComingMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUpComingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.results;
      });
  },
});

export default upComingMoviesSlice.reducer;
