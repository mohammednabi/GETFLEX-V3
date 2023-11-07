import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieVideos = createAsyncThunk("getMovieVideos", async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
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
});

const getMovieVideosSlice = createSlice({
  name: "movieVideos",
  initialState: {
    movies: undefined,
    allVideos: undefined,
    isLoading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getMovieVideos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        const filteredVideos = action.payload.results.find((m) => {
          return m.type === "Trailer";
        });

        state.allVideos = action.payload.results;
        // const filteredAllVideos = action.payload.results.filter((m) => {
        //   return m.key !== state.movies.key;
        // });
        // state.allVideos = filteredAllVideos;

        state.movies = filteredVideos ? filteredVideos : state.allVideos[0];
      });
  },
});

export default getMovieVideosSlice.reducer;
