import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopRatedMovies = createAsyncThunk(
  "getTopRatedMovies",
  async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

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

const TopRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState: {
    movies: [],
    movies2: [],
    movies3: [],
    movies4: [],
    movies5: [],
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getTopRatedMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.page === 1) {
          state.movies = action.payload.results;
        }
        if (action.payload.page === 2) {
          state.movies2 = action.payload.results;
        }
        if (action.payload.page === 3) {
          state.movies3 = action.payload.results;
        }
        if (action.payload.page === 4) {
          state.movies4 = action.payload.results;
        }
        if (action.payload.page === 5) {
          state.movies5 = action.payload.results;
        }
      });
  },
});

export default TopRatedMoviesSlice.reducer;
