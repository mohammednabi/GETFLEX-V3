import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNowPlayingMovies = createAsyncThunk(
  "nowPlayingMovies",
  async (page) => {
    const url = page
      ? `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/now_playing?language=en-US`;

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

const nowPlayinMoviesSlice = createSlice({
  name: "nowPlayingMovies",
  initialState: {
    movies: [],
    secondMovies: [],
    filteredMovies: [],
    filteredMovies2: [],
    isLoading: false,
    currentPage: 1,
    page: 0,
    totalPages: 0,
  },
  reducers: {
    nextPage: (state, action) => {
      state.currentPage++;
    },
    previousPage: (state, action) => {
      state.currentPage--;
    },
    getFilteredNowPlaying: (state, action) => {
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
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Rating Descending") {
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return b.vote_average.toFixed(1) - a.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Year Ascending") {
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return (
              Number(a.release_date.slice(0, 4)) -
              Number(b.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Year Descending") {
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return (
              Number(b.release_date.slice(0, 4)) -
              Number(a.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Title (A-Z)") {
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (action.payload.sortBy === "Title (Z-A)") {
          state.filteredMovies2 = filteredMoviesByGenres.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        }
      } else {
        if (action.payload.sortBy === "Rating Ascending") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Rating Descending") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return b.vote_average.toFixed(1) - a.vote_average.toFixed(1);
          });
        } else if (action.payload.sortBy === "Year Ascending") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return (
              Number(a.release_date.slice(0, 4)) -
              Number(b.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Year Descending") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return (
              Number(b.release_date.slice(0, 4)) -
              Number(a.release_date.slice(0, 4))
            );
          });
        } else if (action.payload.sortBy === "Title (A-Z)") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (action.payload.sortBy === "Title (Z-A)") {
          state.filteredMovies2 = state.movies.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        }
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getNowPlayingMovies.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page = action.payload.page;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.movies.forEach((movie) => {
          state.secondMovies.push(movie);
        });
        state.filteredMovies = state.secondMovies.filter((m, index) => {
          if (state.secondMovies.indexOf(m) === index) {
            return m;
          }
        });
        state.filteredMovies2 = state.movies.sort((a, b) => {
          return a.vote_average.toFixed(1) - b.vote_average.toFixed(1);
        });
      });
  },
});

export const { nextPage, previousPage, getFilteredNowPlaying } =
  nowPlayinMoviesSlice.actions;
export default nowPlayinMoviesSlice.reducer;
