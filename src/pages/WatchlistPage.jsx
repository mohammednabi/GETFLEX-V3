import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WatchListMovie from "../components/cards/WatchListMovie";

export default function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  function deleteMovie(id) {
    const currentMovies = JSON.parse(localStorage.getItem("movies"));
    const filteredMovies = currentMovies.filter((m) => {
      return m.id !== id;
    });
    setWatchlistMovies(filteredMovies);
    const newMovies = JSON.stringify(filteredMovies);
    localStorage.setItem("movies", newMovies);
  }

  useEffect(() => {
    const localstorageMovies = JSON.parse(localStorage.getItem("movies"));

    setWatchlistMovies(localstorageMovies);
  }, []);

  return (
    <>
      <Box sx={{ minHeight: "calc(100vh - 83px - 221px + 1rem)" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", textAlign: "center", margin: "1rem 0" }}
        >
          {watchlistMovies.length !== 0 ? (
            <code>WatchList</code>
          ) : (
            <code>Your List Is Empty</code>
          )}
        </Typography>

        <Container>
          {watchlistMovies &&
            watchlistMovies.length !== 0 &&
            watchlistMovies.map((m) => (
              <WatchListMovie movie={m} key={m.id} deleteMovie={deleteMovie} />
            ))}
        </Container>
      </Box>
    </>
  );
}
