import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchedMovies = createAsyncThunk(
  "getSearchedMovies",
  async (searchQuery) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;
    // const url = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}`;

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

const searchedMoviesSlice = createSlice({
  name: "searchedResults",
  initialState: {
    movies: [],
    isLoading: false,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getSearchedMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchedMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
      });
  },
});

export default searchedMoviesSlice.reducer;
