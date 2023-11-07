import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function RecommendedMovieCard({ movie }) {
  return (
    <>
      <Stack
        spacing={2}
        alignItems={"center"}
        sx={{
          p: 1,
          background: "#060015",
        }}
      >
        <Link
          to={`/movie?${"watchmovie"}=${movie.id}`}
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Box sx={{ width: "10rem", aspectRatio: "27/40" }}>
            <img
              alt=""
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "/imgs/G LOGO.png"
              }
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Link>
        <Typography
          variant="body2"
          sx={{
            color: "white",
            width: "10rem",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,.5)",
            width: "10rem",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <code>Popularity: {movie.popularity.toFixed(2)} %</code>
        </Typography>
      </Stack>
    </>
  );
}
