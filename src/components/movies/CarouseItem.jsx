import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

// icons
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { getMovieVideos } from "../../feutures/api/movieVideosSlice";
// == icons ==

export default function CarouseItem({ movie }) {
  const iconRef = useRef();
  const overlayRef = useRef();

  const [movieVideos, setMovieVideos] = useState();

  function getMovieVideos(id) {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;
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
        const filteredVideos = res.data.results.find((m) => {
          return m.type === "Trailer";
        });
        setMovieVideos(filteredVideos);
      })
      .catch((err) => console.log(err));
  }

  // const dispatch = useDispatch();

  // const movieVideos = useSelector((state) => {
  //   return state.movieVideos.movies;
  // });

  useEffect(() => {
    getMovieVideos(movie.id);
    // dispatch(getMovieVideos(movie.id));
  }, [movie.id]);

  return (
    <>
      <Box sx={{ aspectRatio: "16/9", height: "100%", position: "relative" }}>
        {movie ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundSize: "cover",

              //   backgroundImage:
              //     "url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/whB2PJfxrDWwwksprliJTjYbcZJ.jpg')",
              backgroundImage: `url(${
                movie
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : ""
              })`,

              // opacity: "80%",
              position: "relative",
            }}
          >
            {/* overlay */}

            <Box
              ref={overlayRef}
              sx={{
                background: "black",
                opacity: "0",
                width: "100%",
                height: "100%",
              }}
            ></Box>

            {/* == overlay == */}
            {/* back drop for trailers */}

            {/*== back drop for trailers ==*/}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" size={100} />
          </Box>
        )}
        {/* front display */}
        <Link
          // to={`https://www.youtube.com/watch?v=${
          //   movieVideos ? movieVideos.key : ""
          // }`}

          // target="blank"

          to={`/?watchtrailer=${movieVideos && movieVideos.key}`}
          style={{ cursor: "pointer" }}
          onMouseOver={() => {
            if (movie) {
              iconRef.current.style.color = "#59ec85 ";
              overlayRef.current.style.opacity = ".2 ";
            }
          }}
          onMouseLeave={() => {
            if (movie) {
              iconRef.current.style.color = "white ";
              overlayRef.current.style.opacity = "0 ";
            }
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              background:
                "linear-gradient(180deg, rgba(12,17,15,0) 30%, rgba(6,0,21,.9) 75%)",
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"flex-end"}
              sx={{
                width: "100%",
                position: "absolute",
                bottom: { md: "2rem", xs: ".5rem" },
                left: { md: "2rem", xs: ".5rem" },
              }}
            >
              <Box
                sx={{
                  width: { lg: "10rem", md: "8rem", xs: "4rem" },
                }}
              >
                <img
                  alt=""
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  style={{
                    width: "100%",
                    aspectRatio: "27/40",
                    boxShadow: "5px 5px 5px -5px rgba(6,0,21,0.75)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              </Box>
              <Stack direction={"row"} alignItems={"center"}>
                {/* icon */}

                <IconButton sx={{ color: "white" }} ref={iconRef}>
                  <PlayCircleOutlineIcon
                    sx={{ fontSize: { md: "5rem", xs: "2rem" } }}
                  />
                </IconButton>

                <Stack alignItems={"flex-start"}>
                  <Typography
                    variant="h3"
                    sx={{
                      "& .MuiTypography-root": {
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      },
                      color: "white",
                      fontSize: { md: "1.8rem", sm: "1.7rem", xs: "1rem" },
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"flex-start"}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        opacity: ".7",
                        display: { md: "initial", xs: "none" },
                        fontSize: { md: "2rem", xs: "1rem" },
                      }}
                    >
                      watch the trailer
                    </Typography>
                    {/* <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        opacity: ".7",
                        display: { xs: "initial", md: "none" },
                        fontSize: { md: "2rem", xs: "1rem" },
                      }}
                    >
                      watch
                    </Typography> */}
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        opacity: ".7",
                        fontSize: { md: "2rem", xs: ".7rem" },
                      }}
                    >
                      {/* {targetMovie && targetMovie.runtime} */}
                      {/* {details && details.runtime}{" "}
                      {details && details.runtime && "min"} */}
                      {movie.release_date}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Link>

        {/*== front display ==*/}
      </Box>
    </>
  );
}
