import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { movies } from "../../components/other/TestingMovies";

export const getMovieDetails = createAsyncThunk(
  "getMovieDetails",
  async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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

const getMovieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movies: undefined,
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getMovieDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      });
  },
});

export default getMovieDetailsSlice.reducer;
