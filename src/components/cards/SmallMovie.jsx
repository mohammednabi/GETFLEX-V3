import React, { useEffect, useMemo } from "react";

import { useTheme } from "@emotion/react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  stepButtonClasses,
} from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../feutures/tobewatch/toWatchSlice";

export default function SmallMovie({ movie }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const watchlistValue = useSelector((state) => {
    return state.toBeWatch.value;
  });

  const finded = useMemo(() => {
    return checkAddedToWatchList(movie);
  }, [watchlistValue]);

  function addToWatchList(movieItem) {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      let newMovies = [];

      const finded = movies.find((m) => {
        if (movieItem.id === m.id) {
          return true;
        } else {
          return false;
        }
      });

      if (!finded) {
        newMovies = [...movies, movieItem];
        dispatch(increment());
      } else {
        newMovies = [...movies];
      }

      const allMovies = JSON.stringify(newMovies);
      localStorage.setItem("movies", allMovies);
    }
  }

  function checkAddedToWatchList(movieItem) {
    const allWatchListMovies = JSON.parse(localStorage.getItem("movies"));

    const finded = allWatchListMovies.find((m) => {
      if (movieItem.id === m.id) {
        return true;
      } else {
        return false;
      }
    });

    return finded;
  }

  return (
    <>
      {movie ? (
        <Box
          sx={{
            height: "auto",
            width: { lg: "12rem", md: "10rem", sm: "8rem", xs: "6rem" },
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            position: "relative",
            boxShadow: " 5px 5px 5px 0px #120620",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",

              // mixBlendMode:"multiply",
              color: "rgba(255,255,255,.9)",
              background: !finded ? "rgba(6,0,21,.9)" : "rgba(89,236,133.9)",
              borderRadius: "0",
              height: "3rem",
              borderBottomRightRadius: "70%",
              // borderBottomLeftRadius: "100%",
              top: 0,
              left: 0,
              display: { md: "none", xs: "initial" },
            }}
            onClick={() => {
              addToWatchList(movie);
            }}
          >
            {!finded ? (
              <AddIcon
                sx={{
                  fontSize: "1.7rem",
                }}
              />
            ) : (
              <CheckIcon
                sx={{
                  fontSize: "1.7rem",
                }}
              />
            )}
          </IconButton>
          <Link
            to={`/movie?watchmovie=${movie ? movie.id : ""}`}
            style={{
              textDecoration: "none",
              color: "white",
              background: "#060015",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
              style={{ height: "auto", width: "100%" }}
            />
          </Link>

          <Box
            sx={{
              position: "relative",
              backgroundColor: theme.pallete.primary.second,
              color: "rgba(255,255,255,.9)",
              // padding: "1rem",
              overflow: "hidden",
              height: { md: "15rem", xs: "8rem" },
            }}
          >
            <img
              src="/imgs/8084126_1155.svg"
              alt=""
              style={{
                padding: "0",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mixBlendMode: "soft-light",
              }}
            />
            <Stack
              spacing={1}
              sx={{ padding: "1rem", position: "relative", zIndex: "0" }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                ⭐ {movie && movie.vote_average.toFixed(1)}
              </Typography>

              <Link
                to={`/movie?watchmovie=${movie ? movie.id : ""}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { lg: "1.1rem", md: "1rem", xs: ".55rem" },
                    fontWeight: "bold",
                    textAlign: "center",
                    height: { md: "3.5rem", xs: "1.8rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                  className="link"
                >
                  {movie && movie.title}
                </Typography>
              </Link>

              <Button
                onClick={() => {
                  addToWatchList(movie);
                }}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  // background: "rgba(6,0,21,0.5)",
                  color: !finded ? "#9c27b0" : "#59ec85",
                }}
              >
                {!finded ? <AddIcon /> : <CheckIcon />}
                Watchlist
              </Button>
              <Link
                to={`/watchsomevideos?${"watchmovie"}=${movie.id}&&page=${1}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="link"
              >
                <Button sx={{ color: "rgba(255,255,255,.9)" }}>
                  <PlayCircleOutlineIcon sx={{ fontSize: "2rem" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      display: { xs: "none", md: "initial" },
                      textTransform: "capitalize",
                    }}
                  >
                    trailer
                  </Typography>
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
}
