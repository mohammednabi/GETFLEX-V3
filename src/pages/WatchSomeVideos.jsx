import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieVideos } from "../feutures/api/movieVideosSlice";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { getMovieDetails } from "../feutures/api/movieDetailsSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LastTrailerCard from "../components/movies/LastTrailerCard";
import { getNowPlayingMovies } from "../feutures/api/nowPlayingMovieSlice";
import { color, motion } from "framer-motion";
import { getRecommendations } from "../feutures/api/recomendationsForMovieSlice";
import RecommendedMovieCard from "../components/cards/RecommendedMovieCard";

export default function WatchSomeVideos() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieId = queryParams.get("watchmovie");
  const currentPage = queryParams.get("page");

  const movieVideos = useSelector((state) => {
    return state.movieVideos.movies;
  });

  const movieAllVideos = useSelector((state) => {
    return state.movieVideos.allVideos;
  });

  const movieDetails = useSelector((state) => {
    return state.movieDetails.movies;
  });

  const nowPlayingMovies = useSelector((state) => {
    return state.nowPlayingMovies.movies;
  });

  const recommendations = useSelector((state) => {
    return state.recommendations.movies;
  });

  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const [randomPage, setRandomPage] = useState();

  function getRandomPage(pageNum) {
    let randomNumber = Math.floor(Math.random() * 5) + 1; // Generate a random number from 1 to 10

    while (randomNumber === pageNum) {
      randomNumber = Math.floor(Math.random() * 5) + 1; // Generate a new random number
    }

    return randomNumber;
  }

  // scrolling
  const divRef = useRef();
  const recommendationsRef = useRef();
  const [displayButtons, setDisplayButtons] = useState(true);
  const [recommendationsDisplayButtons, setRecommendationsDisplayButtons] =
    useState(true);

  function handleScrollLeft(reference) {
    const scrollDistance = isMediumScreen ? 500 : 800; // Adjust the scroll distance as needed
    const currentScrollLeft = reference.current.scrollLeft;
    const targetScrollLeft = currentScrollLeft - scrollDistance;

    reference.current.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }

  function handleScrollRight(reference) {
    const scrollDistance = isMediumScreen ? 500 : 800; // Adjust the scroll distance as needed
    const currentScrollLeft = reference.current.scrollLeft;
    const targetScrollLeft = currentScrollLeft + scrollDistance;

    reference.current.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }

  // == scrolling ==

  useEffect(() => {
    if (movieId) {
      setRandomPage(getRandomPage(currentPage));
      dispatch(getMovieVideos(movieId));
      dispatch(getMovieDetails(movieId));
      dispatch(getNowPlayingMovies(randomPage));
      dispatch(getRecommendations(movieId));
      setIndex(0);
    }
    // window.location.reload();
  }, [movieId]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1rem)",
          // background: "#060015",
          background: "#0b001b",
        }}
      >
        {/* <Typography
          variant="h3"
          sx={{ color: "white", padding: "1rem 0", textAlign: "center" }}
        >
          <code>Watch Videos</code>
        </Typography> */}
        <Grid
          spacing={1}
          container
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pb: 10,
            pt: 5,
          }}
        >
          <Grid md={8} xs={12} sx={{ position: "relative" }}>
            {/* Arrows */}

            {/* left arrow */}
            <IconButton
              sx={{ position: "absolute", left: 0, top: "50%", zIndex: "1" }}
              onClick={() => {
                if (index > 0) {
                  setIndex((i) => {
                    return i - 1;
                  });
                }
              }}
            >
              <ArrowBackIosNewIcon
                className="arrow"
                sx={{
                  color: "white",
                  fontSize: { md: 50, xs: 30 },

                  backgroundColor: "rgb(0,0,0,.5) ",
                  border: "solid 1px  #59ec85",
                  height: { md: "5rem", xs: "3rem" },
                  display: index === 0 ? "none" : "initial",
                }}
              />
            </IconButton>
            {/* == left arrow == */}

            {/* right arrow */}
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                zIndex: "1",
                display:
                  movieAllVideos && index === movieAllVideos.length
                    ? "none"
                    : "initial",
              }}
              onClick={() => {
                if (index < movieAllVideos.length) {
                  setIndex((i) => {
                    return i + 1;
                  });
                }
              }}
            >
              <ArrowBackIosNewIcon
                className="arrow"
                sx={{
                  color: "white",
                  fontSize: { md: 50, xs: 30 },
                  transform: "rotate(180deg)",
                  backgroundColor: "rgb(0,0,0,.5) ",
                  border: "solid 1px  #59ec85",
                  height: { md: "5rem", xs: "3rem" },
                }}
              />
            </IconButton>
            {/* == right arrow == */}

            {/* == Arrows == */}
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1920/1080",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                border: "#060015 2px solid",
                boxShadow: "10px 2px 20px 0px black",
              }}
            >
              {movieAllVideos && movieVideos && movieVideos.key ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${
                    movieAllVideos && movieVideos && movieVideos.key
                      ? index === 0
                        ? movieVideos.key
                        : movieAllVideos[index - 1].key
                      : ""
                  }`}
                  // src={`https://www.youtube.com/embed/${"507089"}`}
                  // src={targetMovie.trailer}
                  // src={movieDetails.homepage}
                  title="YouTube Video"
                  allowFullScreen
                  style={{ border: "0" }}
                ></iframe>
              ) : (
                <Skeleton
                  sx={{ width: "100%", height: "100%", background: "black" }}
                  variant="rectangular"
                ></Skeleton>
              )}
            </Box>
          </Grid>
          <Grid
            md={4}
            xs={12}
            sx={{
              // background: "#060015",
              background: "#0b001b",
              padding: "1rem",
              height: "100%",
            }}
          >
            <Stack spacing={2} direction={"row"} sx={{ width: "100%" }}>
              <Link
                to={`/movie?watchmovie=${movieDetails ? movieDetails.id : ""}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Box sx={{ width: "7rem", position: "relative" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movieDetails ? movieDetails.poster_path : ""
                    }`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                  {movieDetails && movieDetails.adult && (
                    <img
                      alt=""
                      src="https://png.monster/wp-content/uploads/2021/06/png.monster-12.png"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "2rem",
                      }}
                    />
                  )}
                </Box>
              </Link>
              <Stack spacing={2}>
                <Link
                  to={`/movie?watchmovie=${
                    movieDetails ? movieDetails.id : ""
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { md: "1.2rem", xs: "1rem" },
                      color: "white",
                    }}
                  >
                    {movieDetails && movieDetails.title}
                  </Typography>
                </Link>
                <Stack
                  direction={"row "}
                  sx={{ gap: ".2rem" }}
                  flexWrap={"wrap"}
                >
                  {movieDetails &&
                    movieDetails.genres.map((g) => (
                      <Link
                        to={`${
                          movieId !== null ? "/categories" : "/seriescategories"
                        }?cat=${g.name}`}
                        key={g.id}
                      >
                        <Chip
                          label={g.name}
                          variant="outlined"
                          sx={{
                            color: "white",
                            fontSize: { md: ".8rem", xs: ".6rem" },
                          }}
                          className="chipy"
                        />
                      </Link>
                    ))}
                </Stack>
              </Stack>
            </Stack>
            <Divider
              sx={{
                backgroundColor: "rgba(255,255,255,.1)",
                margin: "1rem 0",
              }}
            />
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: { md: "1.7rem", xs: "1.5rem" },
                }}
              >
                <code>Watch Videos</code>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: { md: "1.5rem", xs: "1.3rem" },
                }}
              >
                ‹‹
                <code>
                  {movieVideos && movieAllVideos
                    ? index === 0
                      ? movieVideos.type
                      : movieAllVideos[index - 1].type
                    : ` No Videos Founded`}{" "}
                </code>
                ››
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#50de7b",
                  textAlign: "center",
                  fontSize: { md: "1.5rem", xs: "1.3rem" },
                }}
              >
                {" "}
                {movieVideos && movieAllVideos
                  ? index === 0
                    ? movieVideos.name
                    : movieAllVideos[index - 1].name
                  : ""}
              </Typography>{" "}
              <Link to={"/latesttrailers"} className="link">
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontSize: { md: "1.3rem", xs: "1.1rem" },
                  }}
                >
                  ↤ Back To Trailers Page
                </Typography>{" "}
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Stack sx={{ position: "relative", pb: { md: 8, xs: 3 } }} spacing={4}>
          <Typography
            variant="h4"
            sx={{ color: "white", fontSize: { md: "1.7rem", xs: "1.5rem" } }}
          >
            <code>Trending Trailers</code>
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              top: "30%",
              left: "0",
              zIndex: "1",
              display: { md: "initial", xs: "none" },
            }}
            onClick={() => {
              handleScrollLeft(divRef);
            }}
          >
            <ArrowBackIosNewIcon
              className="arrow"
              sx={{
                color: "white",
                fontSize: 50,
                backgroundColor: "rgb(0,0,0,.2) ",
                border: "solid 1px  #59ec85",
                height: "5rem",
                transition: ".5s",
                opacity: displayButtons ? "100%" : "0",
              }}
              onMouseOver={() => {
                setDisplayButtons(true);
              }}
              onMouseOut={() => {
                setDisplayButtons(false);
              }}
            />
          </IconButton>
          <Box
            ref={divRef}
            sx={{
              overflow: "auto",
              position: "relative",
              display: "flex",
              gap: { md: "1rem", xs: ".5rem" },
              // alignItems: "center",
            }}
          >
            {nowPlayingMovies.length > 0 ? (
              nowPlayingMovies.map((movie) => (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, type: "spring" }}
                    exit={{ opacity: 0 }}
                  >
                    <Box sx={{ aspectRatio: "16/9" }}>
                      <LastTrailerCard movie={movie} key={movie.id} />{" "}
                    </Box>
                  </motion.div>
                </>
              ))
            ) : (
              <CircularProgress color="secondary" size={100} />
            )}
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              top: "30%",
              right: "0",
              zIndex: "1",
              display: { md: "initial", xs: "none" },
            }}
            onClick={() => {
              handleScrollRight(divRef);
            }}
          >
            <ArrowBackIosNewIcon
              className="arrow"
              sx={{
                color: "white",
                fontSize: 50,
                transform: "rotate(180deg)",
                backgroundColor: "rgb(0,0,0,.2) ",
                border: "solid 1px  #59ec85",
                height: "5rem",
                transition: ".5s",
                opacity: displayButtons ? "100%" : "0",
              }}
              onMouseOver={() => {
                setDisplayButtons(true);
              }}
              onMouseOut={() => {
                setDisplayButtons(false);
              }}
            />
          </IconButton>
        </Stack>
        <Stack spacing={2} sx={{ position: "relative", pb: 5 }}>
          {recommendations && recommendations.length > 0 && (
            <Stack spacing={2}>
              <Divider sx={{ backgroundColor: "rgba(255,255,255,.1)" }} />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontSize: { md: "1.7rem", xs: "1.5rem" },
                }}
              >
                <code>Recommended Movies</code>
              </Typography>
            </Stack>
          )}
          {recommendations && recommendations.length > 0 && (
            <IconButton
              sx={{
                position: "absolute",
                top: "30%",
                left: "0",
                zIndex: "1",
                display: { md: "initial", xs: "none" },
              }}
              onClick={() => {
                handleScrollLeft(recommendationsRef);
              }}
            >
              <ArrowBackIosNewIcon
                className="arrow"
                sx={{
                  color: "white",
                  fontSize: 50,
                  backgroundColor: "rgb(0,0,0,.2) ",
                  border: "solid 1px  #59ec85",
                  height: "5rem",
                  transition: ".5s",
                  opacity: recommendationsDisplayButtons ? "100%" : "0",
                }}
                onMouseOver={() => {
                  setRecommendationsDisplayButtons(true);
                }}
                onMouseOut={() => {
                  setRecommendationsDisplayButtons(false);
                }}
              />
            </IconButton>
          )}
          <Box
            ref={recommendationsRef}
            sx={{ overflow: "auto", display: "flex", gap: "1rem" }}
          >
            {recommendations &&
              recommendations.length > 0 &&
              recommendations.map((movie) => (
                <RecommendedMovieCard movie={movie} key={movie.id} />
              ))}
          </Box>
          {recommendations && recommendations.length > 0 && (
            <IconButton
              sx={{
                position: "absolute",
                top: "30%",
                right: "0",
                zIndex: "1",
                display: { md: "initial", xs: "none" },
              }}
              onClick={() => {
                handleScrollRight(recommendationsRef);
              }}
            >
              <ArrowBackIosNewIcon
                className="arrow"
                sx={{
                  color: "white",
                  fontSize: 50,
                  transform: "rotate(180deg)",
                  backgroundColor: "rgb(0,0,0,.2) ",
                  border: "solid 1px  #59ec85",
                  height: "5rem",
                  transition: ".5s",
                  opacity: recommendationsDisplayButtons ? "100%" : "0",
                }}
                onMouseOver={() => {
                  setRecommendationsDisplayButtons(true);
                }}
                onMouseOut={() => {
                  setRecommendationsDisplayButtons(false);
                }}
              />
            </IconButton>
          )}
        </Stack>
      </Container>
    </>
  );
}
