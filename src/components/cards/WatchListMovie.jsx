import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { decrement } from "../../feutures/tobewatch/toWatchSlice";

export default function WatchListMovie({ movie, deleteMovie }) {
  const [details, setDetails] = useState();
  const dispatch = useDispatch();

  function getMovieDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWQwNTJkYjE3NmYwNzBlZTY5ZThhYTNkNGMxNTlmNyIsInN1YiI6IjY1MWY3YmM2NzQ1MDdkMDBmZjk4Y2M0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dBFqY-1oACk5BYf4myVH6eMREfT7pUUf_I9hMxtjeCs",
      },
    };

    axios
      .get(url, options)
      .then((res) => {
        setDetails(res.data);
      
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getMovieDetails(movie.id);
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          padding: "1rem 2rem",
          background: "#060015",
          border: "2px solid #58eb84",
          color: "white",
          mb: 3,
        }}
        className="search-link"
      >
        <Grid md={2} xs={3.5}>
          <Stack
            alignItems={"center"}
            spacing={1}
            sx={{ width: { md: "6rem", xs: "4rem" } }}
          >
            <Link
              to={`/movie?watchmovie=${movie ? movie.id : ""}`}
              className="search-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt=""
                style={{ width: "100%" }}
              />
            </Link>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,.7)",
                fontSize: { md: "1.2rem", xs: ".9rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {movie.release_date.slice(0, 4)}
            </Typography>
          </Stack>
        </Grid>

        <Grid md={8} xs={6.5}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { md: "1.5rem", xs: "1.2rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {movie.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,.7)",
                fontSize: { md: "1.2rem", xs: ".9rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {details &&
                details.genres
                  .map((g) => {
                    return g.name;
                  })
                  .join(" | ")}
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontSize: { md: "1.5rem", xs: "1.2rem" } }}
            >
              ⭐ {movie.vote_average.toFixed(1)}
            </Typography>

            <br />
            <Typography
              variant=""
              sx={{
                color: "rgba(255,255,255,.7)",
                display: { md: "initial", xs: "none" },
              }}
            >
              {movie.overview}
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          md={2}
          xs={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            sx={{
              width: "100%",
              height: "100%",
              fontSize: ".7rem",
              display: { md: "initial", xs: "none" },
            }}
            color="secondary"
            onClick={() => {
              deleteMovie(movie.id);
              dispatch(decrement());
            }}
          >
            delete
          </Button>
          <IconButton
            color="secondary"
            sx={{ display: { md: "none", xs: "initial" } }}
            onClick={() => {
              deleteMovie(movie.id);
              dispatch(decrement());
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
