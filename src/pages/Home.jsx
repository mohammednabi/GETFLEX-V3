import React, { useEffect, useState } from "react";

import TrailerBox from "../components/movies/TrailerBox";
import SmallMoviesSection from "../components/other/SmallMoviesSection";

import { motion } from "framer-motion";
import {
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TrailBox2 from "../components/movies/TrailBox2";

import { useTheme } from "@emotion/react";

import TrailerScreen from "../components/other/TrailerScreen";

import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../feutures/api/popularMoviesSlice";
import { getTopRatedMovies } from "../feutures/api/topRatedMoviesSlice";
import { getUpComingMovies } from "../feutures/api/UpComingMoviesSlice";

export default function Home() {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const popularMovies = useSelector((state) => {
    return state.popularMovies.movies;
  });

  const popularMoviesLoading = useSelector((state) => {
    return state.popularMovies.isLoading;
  });

  const topRatedMovies = useSelector((state) => {
    return state.topRatedMovies.movies;
  });

  const topRatedMoviesLoading = useSelector((state) => {
    return state.topRatedMovies.isLoading;
  });

  const upComingMovies = useSelector((state) => {
    return state.upComingMovies.movies;
  });

  const upComingMoviesLoading = useSelector((state) => {
    return state.upComingMovies.isLoading;
  });

  useEffect(() => {
    dispatch(getPopularMovies(1));

    dispatch(getTopRatedMovies(1));
    dispatch(getUpComingMovies(1));
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1rem)",
        }}
      >
        <TrailBox2 />
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          sx={{
            color: theme.pallete.mygreen.main,
            textAlign: "center",
            mt: 5,
          }}
        >
          <code>What To Watch</code>
        </Typography>
        {!popularMoviesLoading &&
        !topRatedMoviesLoading &&
        !upComingMoviesLoading ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, type: "spring" }}
              exit={{ opacity: 0 }}
            >
              <SmallMoviesSection
                caption="popular movies"
                movies={popularMovies}
                backColor="transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, type: "spring" }}
              exit={{ opacity: 0 }}
            >
              <SmallMoviesSection
                caption="top rated"
                movies={topRatedMovies}
                backColor="#060015"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, type: "spring" }}
              exit={{ opacity: 0 }}
            >
              <SmallMoviesSection
                caption="upcoming movies"
                movies={upComingMovies}
                backColor="transparent"
              />
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, type: "spring" }}
              exit={{ opacity: 0 }}
            >
              <SmallMoviesSection
                caption="series"
                movies={recomendedSeries}
                backColor="#060015"
                type={"series"}
              />
            </motion.div> */}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "grid",
              placeItems: "center",
              height: "10rem",
            }}
          >
            <CircularProgress color="secondary" size={100} />
          </Box>
        )}
      </Box>
    </>
  );
}
