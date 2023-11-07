import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function GenreCard({ movie, type }) {
  const myColor =
    movie.vote_average.toFixed(1) > 7.5
      ? "#59ec85"
      : movie.vote_average.toFixed(1) > 5
      ? "#ede85a"
      : "#a5112c";
  return (
    <>
      <Stack
        sx={{
          padding: " .5rem",
          background: "#060015",
          color: "white",
          maxWidth: "12rem",
        }}
      >
        <Box sx={{ width: "12rem", position: "relative" }}>
          <Link
            to={`/movie?${type === "serie" ? "watchserie" : "watchmovie"}=${
              movie.id
            }`}
          >
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              style={{ width: "100%" }}
            />
          </Link>
          <Box
            sx={{
              width: { md: "2.5rem", xs: "2.5rem" },
              position: "absolute",
              top: ".1rem",
              right: ".1rem",
              //   background: "#d6d6d6",
            }}
          >
            <CircularProgressbar
              value={movie.vote_average.toFixed(1)}
              maxValue={10}
              text={`${movie.vote_average.toFixed(1)}`}
              background={true}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "2.5rem",
                pathColor: myColor,
                textColor: myColor,
                backgroundColor: "#060015",
              })}
            />
          </Box>
        </Box>
        <Stack alignItems={"center"} spacing={1}>
          <Link
            to={`/movie?${type === "serie" ? "watchserie" : "watchmovie"}=${
              movie.id
            }`}
            style={{
              textDecoration: "none",

              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="h6"
              className="link"
              sx={{
                fontSize: { lg: "1.1rem", md: "1rem", xs: ".75rem" },
                fontWeight: "bold",
                textAlign: "center",
                height: { md: "3.5rem", xs: "1.5rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: { md: 2, xs: 1 },
              }}
            >
              {movie.title}
            </Typography>
          </Link>
          <Typography variant="body1">
            {movie.release_date.slice(0, 4)}
          </Typography>
          <Stack
            direction={"row"}
            spacing={1}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ gap: ".5rem 0" }}
          ></Stack>
        </Stack>
      </Stack>
    </>
  );
}
