import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesGenres = createAsyncThunk("getMoviesGenres", async () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list?language=en",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWQwNTJkYjE3NmYwNzBlZTY5ZThhYTNkNGMxNTlmNyIsInN1YiI6IjY1MWY3YmM2NzQ1MDdkMDBmZjk4Y2M0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dBFqY-1oACk5BYf4myVH6eMREfT7pUUf_I9hMxtjeCs",
    },
  };

  const response = await axios.request(options);
  // console.log("genres", response.data.genres);
  return response.data.genres;
});

const getMovieSGenresSlice = createSlice({
  name: "moviesGenres",
  initialState: {
    genres: undefined,
    isLoading: false,
    selectedGenres: undefined,
    
  },
  reducers: {
    selectChip: (state, action) => {
      const editedGenresSelcted = state.genres.map((g) => {
        if (g.name === action.payload.name) {
          return { ...g, selected: !g.selected };
        } else {
          return g;
        }
      });

      state.genres = editedGenresSelcted;
      state.selectedGenres = state.genres.filter((g) => {
        return g.selected === true;
      });
    },

   
  },
  extraReducers(builder) {
    builder
      .addCase(getMoviesGenres.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMoviesGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        const editedGenres = action.payload.map((g) => {
          return { ...g, selected: false };
        });
        state.genres = editedGenres;
      });
  },
});

export const { selectChip, selectSpecificChip } = getMovieSGenresSlice.actions;
export default getMovieSGenresSlice.reducer;
