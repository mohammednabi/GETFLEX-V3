import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecommendations = createAsyncThunk(
  "getRecommendations",
  async (id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWQwNTJkYjE3NmYwNzBlZTY5ZThhYTNkNGMxNTlmNyIsInN1YiI6IjY1MWY3YmM2NzQ1MDdkMDBmZjk4Y2M0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dBFqY-1oACk5BYf4myVH6eMREfT7pUUf_I9hMxtjeCs",
      },
    };

    const response = await axios.request(options);

    return response.data;
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {
    movies: [],
    isLoading: false,
    page: 0,
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getRecommendations.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      });
  },
});

export default recommendationsSlice.reducer;
