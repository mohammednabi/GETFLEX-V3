import React, { useContext, useEffect, useMemo, useState } from "react";
import TopMovie from "../components/cards/TopMovie";
import { Container, Divider, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MoviesContext } from "../contexts/MoviesContext";
import { useSelector, useDispatch } from "react-redux";
import { getTopRatedMovies } from "../feutures/api/topRatedMoviesSlice";

export default function Top100Movies() {
  const topMovies = useSelector((state) => {
    return state.topRatedMovies.movies;
  });

  const topMovies2 = useSelector((state) => {
    return state.topRatedMovies.movies2;
  });

  const topMovies3 = useSelector((state) => {
    return state.topRatedMovies.movies3;
  });

  const topMovies4 = useSelector((state) => {
    return state.topRatedMovies.movies4;
  });

  const topMovies5 = useSelector((state) => {
    return state.topRatedMovies.movies5;
  });

  const isLoading = useSelector((state) => {
    return state.topRatedMovies.isLoading;
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopRatedMovies(1));
    dispatch(getTopRatedMovies(2));
    dispatch(getTopRatedMovies(3));
    dispatch(getTopRatedMovies(4));
    dispatch(getTopRatedMovies(5));
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1rem)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "white", textAlign: "center", margin: "1rem 0" }}
        >
          Top 100 Movies
        </Typography>
        {!isLoading ? (
          <>
            {topMovies.map((top, index) => (
              <React.Fragment key={uuidv4()}>
                <TopMovie movie={top} index={index} />
                <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
              </React.Fragment>
            ))}
            {topMovies2.map((top, index) => (
              <React.Fragment key={uuidv4()}>
                <TopMovie movie={top} index={index + 20} />
                <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
              </React.Fragment>
            ))}
            {topMovies3.map((top, index) => (
              <React.Fragment key={uuidv4()}>
                <TopMovie movie={top} index={index + 40} />
                <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
              </React.Fragment>
            ))}{" "}
            {topMovies4.map((top, index) => (
              <React.Fragment key={uuidv4()}>
                <TopMovie movie={top} index={index + 60} />
                <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
              </React.Fragment>
            ))}{" "}
            {topMovies5.map((top, index) => (
              <React.Fragment key={uuidv4()}>
                <TopMovie movie={top} index={index + 80} />
                <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
              </React.Fragment>
            ))}
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: "25rem" }}
          />
        )}
      </Container>
    </>
  );
}
