import {
  Avatar,
  Badge,
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../feutures/api/movieDetailsSlice";
import { getMovieVideos } from "../feutures/api/movieVideosSlice";
import { getCast } from "../feutures/api/movieCastSlice";
import CompanyCard from "../components/movies/CompanyCard";
import CastCard from "../components/movies/CastCard";
import { getRecommendations } from "../feutures/api/recomendationsForMovieSlice";
import RecommendedMovieCard from "../components/cards/RecommendedMovieCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getSimilar } from "../feutures/api/similarMoviesSlice";

export default function FullMovies() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieId = queryParams.get("watchmovie");
  const serieId = queryParams.get("watchserie");

  // const [targetMovie, setTargetMovie] = useState();

  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => {
    return state.movieDetails.movies;
  });

  const movieVideos = useSelector((state) => {
    return state.movieVideos.movies;
  });

  const movieCast = useSelector((state) => {
    return state.cast.cast;
  });

  const recommendations = useSelector((state) => {
    return state.recommendations.movies;
  });

  const similarMovies = useSelector((state) => {
    return state.similar.movies;
  });

  // scrolling
  const divRef = useRef();
  const castRef = useRef();
  const similarRef = useRef();
  const [displayButtons, setDisplayButtons] = useState(true);
  const [castDisplayButtons, setCastDisplayButtons] = useState(true);
  const [similarDisplayButtons, setSimilarDisplayButtons] = useState(true);

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

  function getMovieDuration(time) {
    const hours = time / 60;
    const minutes = time - Math.floor(hours) * 60;

    return `${Math.floor(hours)} h ${minutes} m`;
  }

  // == scrolling ==

  const myColor = useMemo(() => {
    if (movieDetails) {
      return movieDetails.vote_average.toFixed(1) > 7.5
        ? "#59ec85"
        : movieDetails.vote_average.toFixed(1) > 5
        ? "#ede85a"
        : "#a5112c";
    }
  }, [movieId, movieDetails]);

  useEffect(() => {
    if (movieId !== null) {
      dispatch(getMovieDetails(movieId));
      dispatch(getMovieVideos(movieId));
      dispatch(getCast(movieId));
      dispatch(getRecommendations(movieId));
      dispatch(getSimilar(movieId));
      if (window.screenY !== 0) {
        divRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        castRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        similarRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        window.scrollTo(0, 0);
      }
    }
  }, [movieId]);

  return (
    <>
      <Container maxWidth={"xl"} sx={{ backgroundColor: "#140624" }}>
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "#140624",
            minHeight: "calc(100vh - 83px - 221px + 1rem)",
            padding: ".2rem",
          }}
        >
          {movieDetails ? (
            <Box
              sx={{ color: "white", padding: { md: "2rem", xs: "2rem .2rem" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  sx={{
                    background: { md: "none", xs: "#060015" },
                    margin: 0,
                    marginBottom: "1rem",
                    width: "100%",
                  }}
                >
                  <Grid
                    container
                    xs={9}
                    md={11}
                    sx={{
                      justifyContent: { md: "flex-start", xs: "center" },
                    }}
                  >
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: { md: "2.5rem", xs: "1.1rem" },
                          fontWeight: "bold",
                        }}
                      >
                        {movieDetails.title}
                      </Typography>

                      <Stack direction={"row"} spacing={5}>
                        <Typography
                          sx={{
                            fontSize: { md: "1.5rem", xs: ".9rem" },
                            color: "grey",
                          }}
                        >
                          {getMovieDuration(movieDetails.runtime)}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { md: "1.2rem", xs: ".7rem" },
                            color: "rgba(255,255,255,.8)",
                            display: { xs: "none", md: "initial" },
                          }}
                        >
                          Puplished In : {movieDetails.release_date}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { md: "1.2rem", xs: ".7rem" },
                            color: "rgba(255,255,255,.8)",
                            display: { md: "none", xs: "initial" },
                          }}
                        >
                          {movieDetails.release_date}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={0}
                    md={1}
                    sx={{ display: { xs: "none", md: "initial" } }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        display: { md: "initial", xs: "none" },
                        width: { xs: "100%" },
                      }}
                    >
                      <Box sx={{ width: { md: "4rem", xs: "3rem" } }}>
                        {movieDetails &&
                        movieDetails.vote_average.toFixed(1) > 0 ? (
                          <CircularProgressbar
                            value={movieDetails.vote_average.toFixed(1)}
                            maxValue={10}
                            text={`${movieDetails.vote_average.toFixed(1)}`}
                            background={true}
                            styles={buildStyles({
                              strokeLinecap: "butt",
                              textSize: "2.5rem",
                              pathColor: myColor,
                              textColor: myColor,
                              backgroundColor: "#060015",
                            })}
                          />
                        ) : (
                          <img
                            style={{ width: "150%", height: "150%" }}
                            alt=""
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/NOTRATED.svg/2200px-NOTRATED.svg.png"
                          />
                        )}
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid container xs={3} md={0}>
                    <Stack
                      sx={{
                        position: "relative",
                        display: { md: "none", xs: "initial" },
                        width: "100%",
                        height: "100%",
                        p: 1,
                      }}
                    >
                      <Box
                        sx={{
                          // width: { md: "4rem", xs: "3rem" },
                          width: "20%",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          display: "grid",
                          placeItems: "center",
                          zIndex: 5,
                        }}
                      >
                        {movieDetails &&
                        movieDetails.vote_average.toFixed(1) > 0 ? (
                          <CircularProgressbar
                            value={movieDetails.vote_average.toFixed(1)}
                            maxValue={10}
                            text={`${movieDetails.vote_average.toFixed(1)}`}
                            background={true}
                            styles={buildStyles({
                              strokeLinecap: "butt",
                              textSize: "2.5rem",
                              pathColor: myColor,
                              textColor: myColor,
                              backgroundColor: "#060015",
                            })}
                          />
                        ) : (
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "black",
                            }}
                            alt=""
                            src="https://moesrealm.com/MC/images/Rating%20MPAA%20Not%20Rated%20Small.png"
                          />
                        )}
                      </Box>
                      {movieDetails && movieDetails.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <Skeleton
                          sx={{
                            width: "100%",
                            height: "100%",
                            background: "black",
                          }}
                          variant="rectangular"
                        ></Skeleton>
                      )}
                      {movieDetails && movieDetails.adult && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            width: "2rem",
                            zIndex: "3",
                          }}
                        >
                          <img
                            alt=""
                            src="https://png.monster/wp-content/uploads/2021/06/png.monster-12.png"
                            style={{ width: "100%" }}
                          />
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  // justifyContent:"flex-start",
                  color: "white",
                  gap: "1rem",
                  // backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
                  // backgroundSize: "cover",
                }}
              >
                <Box
                  sx={{
                    width: "25%",
                    display: { md: "initial", xs: "none" },
                    minHeight: "100%",
                    position: "relative",
                  }}
                >
                  {movieDetails && movieDetails.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: "100%",
                        background: "black",
                      }}
                      variant="rectangular"
                    ></Skeleton>
                  )}
                  {movieDetails && movieDetails.adult && (
                    <img
                      alt=""
                      src="https://png.monster/wp-content/uploads/2021/06/png.monster-12.png"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "4rem",
                      }}
                    />
                  )}
                  )
                </Box>
                <Box
                  sx={{
                    width: { md: "75%", xs: "100%" },
                    minHeight: { md: "100%", sm: "25rem", xs: "15rem" },
                  }}
                >
                  {movieVideos ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${movieVideos.key}`}
                      // src={targetMovie.trailer}
                      // src={movieDetails.homepage}
                      title="YouTube Video"
                      allowFullScreen
                      style={{ border: "0" }}
                    ></iframe>
                  ) : (
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: "100%",
                        background: "black",
                      }}
                      variant="rectangular"
                    ></Skeleton>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginTop: ".5rem",
                }}
              >
                {movieDetails.genres.map((g) => (
                  <Link
                    to={`${
                      movieId !== null && serieId === null
                        ? "/categories"
                        : "/seriescategories"
                    }?cat=${g.name}`}
                    key={g.id}
                  >
                    <Chip
                      label={g.name}
                      variant="outlined"
                      sx={{ color: "white" }}
                      className="chipy"
                    />
                  </Link>
                ))}
              </Box>
              <Stack spacing={1} sx={{ marginTop: "1rem" }}>
                <Stack spacing={1} sx={{ alignItems: "center" }}>
                  <Typography sx={{ fontSize: { md: "1.5rem", xs: "1.1rem" } }}>
                    {movieDetails.overview}
                  </Typography>
                </Stack>
                {movieId !== null && serieId === null && (
                  <>
                    {movieDetails.production_companies.length > 0 && (
                      <Stack spacing={2}>
                        <Divider
                          sx={{ backgroundColor: "rgba(255,255,255,.1)" }}
                        />
                        <Typography
                          sx={{ fontSize: { md: "1.5rem", xs: "1.1rem" } }}
                          textAlign={"center"}
                        >
                          <code>Production Companies</code>
                        </Typography>
                      </Stack>
                    )}
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-evenly"}
                    >
                      {movieDetails &&
                        movieDetails.production_companies.map(
                          (p) =>
                            p.logo_path && (
                              <CompanyCard
                                logo_path={p.logo_path}
                                companyName={p.name}
                              />
                            )
                        )}
                    </Stack>
                    <Stack spacing={2} sx={{ position: "relative" }}>
                      {movieCast && movieCast.length > 0 && (
                        <Stack spacing={2}>
                          <Divider
                            sx={{ backgroundColor: "rgba(255,255,255,.1)" }}
                          />
                          <Typography
                            sx={{ fontSize: { md: "1.5rem", xs: "1.1rem" } }}
                            textAlign={"center"}
                          >
                            <code>Cast</code>
                          </Typography>
                        </Stack>
                      )}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "30%",
                          left: "0",
                          zIndex: "1",
                          display: { md: "initial", xs: "none" },
                        }}
                        onClick={() => {
                          handleScrollLeft(castRef);
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
                            opacity: castDisplayButtons ? "100%" : "0",
                          }}
                          onMouseOver={() => {
                            setCastDisplayButtons(true);
                          }}
                          onMouseOut={() => {
                            setCastDisplayButtons(false);
                          }}
                        />
                      </IconButton>
                      <Box
                        ref={castRef}
                        sx={{
                          gap: { md: "1rem", xs: ".2rem" },
                          display: "flex",
                          overflow: "auto",
                        }}
                      >
                        {movieCast &&
                          movieCast.map((p, index) => (
                            <CastCard
                              profile={p.profile_path ? p.profile_path : false}
                              name={p.name ? p.name : false}
                              character={p.character ? p.character : false}
                              job={p.job ? p.job : false}
                            />
                          ))}
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
                          handleScrollRight(castRef);
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
                            opacity: castDisplayButtons ? "100%" : "0",
                          }}
                          onMouseOver={() => {
                            setCastDisplayButtons(true);
                          }}
                          onMouseOut={() => {
                            setCastDisplayButtons(false);
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Stack spacing={2} sx={{ position: "relative" }}>
                      {recommendations && recommendations.length > 0 && (
                        <Stack spacing={2}>
                          <Divider
                            sx={{ backgroundColor: "rgba(255,255,255,.1)" }}
                          />
                          <Typography
                            sx={{ fontSize: { md: "1.5rem", xs: "1.1rem" } }}
                            textAlign={"center"}
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
                      )}
                      <Box
                        ref={divRef}
                        sx={{ overflow: "auto", display: "flex", gap: "1rem" }}
                      >
                        {recommendations &&
                          recommendations.length > 0 &&
                          recommendations.map((movie) => (
                            <RecommendedMovieCard
                              movie={movie}
                              key={movie.id}
                            />
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
                      )}
                    </Stack>
                  </>
                )}
                {/* similar movies */}
                <Stack spacing={2} sx={{ position: "relative" }}>
                  {similarMovies && similarMovies.length > 0 && (
                    <Stack spacing={2}>
                      <Divider
                        sx={{ backgroundColor: "rgba(255,255,255,.1)" }}
                      />
                      <Typography
                        sx={{ fontSize: { md: "1.5rem", xs: "1.1rem" } }}
                        textAlign={"center"}
                      >
                        <code>Similar Movies</code>
                      </Typography>
                    </Stack>
                  )}
                  {similarMovies && similarMovies.length > 0 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "30%",
                        left: "0",
                        zIndex: "1",
                        display: { md: "initial", xs: "none" },
                      }}
                      onClick={() => {
                        handleScrollLeft(similarRef);
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
                          opacity: similarDisplayButtons ? "100%" : "0",
                        }}
                        onMouseOver={() => {
                          setDisplayButtons(true);
                        }}
                        onMouseOut={() => {
                          setDisplayButtons(false);
                        }}
                      />
                    </IconButton>
                  )}
                  <Box
                    ref={similarRef}
                    sx={{ overflow: "auto", display: "flex", gap: "1rem" }}
                  >
                    {similarMovies &&
                      similarMovies.length > 0 &&
                      similarMovies.map((movie) => (
                        <RecommendedMovieCard movie={movie} key={movie.id} />
                      ))}
                  </Box>
                  {similarMovies && similarMovies.length > 0 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "30%",
                        right: "0",
                        zIndex: "1",
                        display: { md: "initial", xs: "none" },
                      }}
                      onClick={() => {
                        handleScrollRight(similarRef);
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
                          opacity: similarDisplayButtons ? "100%" : "0",
                        }}
                        onMouseOver={() => {
                          setDisplayButtons(true);
                        }}
                        onMouseOut={() => {
                          setDisplayButtons(false);
                        }}
                      />
                    </IconButton>
                  )}
                </Stack>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{ pt: 5 }}
                >
                  <Link
                    to={"/categories"}
                    style={{
                      textDecoration: "none",
                    }}
                    className="link"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { md: "1.2rem", xs: ".8rem" },
                        color: "white",
                      }}
                    >
                      ↢ Discover Movies
                    </Typography>
                  </Link>
                  <Link
                    to={`/watchsomevideos?${"watchmovie"}=${
                      movieDetails.id
                    }&&page=${1}`}
                    style={{
                      textDecoration: "none",
                    }}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    className="link"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { md: "1.2rem", xs: ".8rem" },
                        color: "white",
                      }}
                    >
                      Watch Movie Videos ↣
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Box>
          ) : (
            <Skeleton
              sx={{
                width: "100%",
                height: "calc(100vh - 83px - 221px + 1rem)",
              }}
              variant="rectangular"
            />
          )}
        </Container>
      </Container>
    </>
  );
}
