import { configureStore } from "@reduxjs/toolkit";
import toWatchSlice from "../feutures/tobewatch/toWatchSlice";
import nowPlayingMovieSlice from "../feutures/api/nowPlayingMovieSlice";
import popularMoviesSlice from "../feutures/api/popularMoviesSlice";
import topRatedMoviesSlice from "../feutures/api/topRatedMoviesSlice";
import UpComingMoviesSlice from "../feutures/api/UpComingMoviesSlice";
import movieDetailsSlice from "../feutures/api/movieDetailsSlice";
import movieVideosSlice from "../feutures/api/movieVideosSlice";
import searchMovieSlice from "../feutures/api/searchMovieSlice";
import movieCastSlice from "../feutures/api/movieCastSlice";
import recomendationsForMovieSlice from "../feutures/api/recomendationsForMovieSlice";
import similarMoviesSlice from "../feutures/api/similarMoviesSlice";
import moviesGenresSlice from "../feutures/api/moviesGenresSlice";
export default configureStore({
  reducer: {
    toBeWatch: toWatchSlice,
    nowPlayingMovies: nowPlayingMovieSlice,
    popularMovies: popularMoviesSlice,
    topRatedMovies: topRatedMoviesSlice,
    upComingMovies: UpComingMoviesSlice,
    movieDetails: movieDetailsSlice,
    movieVideos: movieVideosSlice,
    searchedMovies: searchMovieSlice,
    cast: movieCastSlice,
    recommendations: recomendationsForMovieSlice,
    similar: similarMoviesSlice,
    genres: moviesGenresSlice,
  },
});
