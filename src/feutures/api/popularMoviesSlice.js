import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPopularMovies = createAsyncThunk(
  "getPopularMovies",
  async (page) => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

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

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState: {
    movies: [],
    isLoading: false,
    filteredMovies: [],
    page: 0,
    totalPages: 0,
  },
  reducers: {
    getFiltered: (state, action) => {
      if (
        action.payload.selectedGenres &&
        action.payload.selectedGenres.length > 0
      ) {
        const selectedGenresIds = action.payload.selectedGenres.map((g) => {
          return g.id;
        });

        const filteredMoviesByGenres = state.movies.filter((m) => {
          for (let i = 0; i < selectedGenresIds.length; i++) {
            if (m.genre_ids.includes(selectedGenresIds[i])) {
              return m;
            }
          }
        });

        if (action.payload.sortBy === "Rating Ascending") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Rating Descending") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return b.vote_average.toFixed(1) - a.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Year Ascending") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return (
              Number(a.release_date.slice(0, 4)) -
              Number(b.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Year Descending") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return (
              Number(b.release_date.slice(0, 4)) -
              Number(a.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Title (A-Z)") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (action.payload.sortBy === "Title (Z-A)") {
          state.filteredMovies = filteredMoviesByGenres.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        }
      } else {
        if (action.payload.sortBy === "Rating Ascending") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Rating Descending") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return b.vote_average.toFixed(1) - a.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Year Ascending") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return (
              Number(a.release_date.slice(0, 4)) -
              Number(b.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Year Descending") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return (
              Number(b.release_date.slice(0, 4)) -
              Number(a.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Title (A-Z)") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (action.payload.sortBy === "Title (Z-A)") {
          state.filteredMovies = state.movies.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPopularMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.filteredMovies = state.movies.sort((a, b) => {
          return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
        });
      });
  },
});

export const { getFiltered } = popularMoviesSlice.actions;
export default popularMoviesSlice.reducer;
