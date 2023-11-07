import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SearchedMovie({ movie, cancel }) {
  return (
    <>
      <Link
        to={`movie?watchmovie=${movie.id}`}
        className="search-link"
        onClick={cancel}
      >
        <Grid container alignItems={"center"}>
          <Grid lg={1.3} md={3} xs={3}>
            <Box
              sx={{
                width: { lg: "3.5rem", md: "2rem", xs: "4rem" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid lg={10.7} md={9} xs={9} container>
            <Stack>
              <Typography
                variant="h6"
                sx={{ fontSize: { lg: "1.5rem", md: "1rem" } }}
              >
                {movie.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,.7)",
                  fontSize: { lg: "1.2rem", md: ".7rem" },
                }}
              >
                {movie.release_date && movie.release_date.slice(0, 4)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: { lg: "1.1rem", md: ".6rem" },
                }}
              >
                Popularity : {movie.popularity}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Link>
    </>
  );
}
