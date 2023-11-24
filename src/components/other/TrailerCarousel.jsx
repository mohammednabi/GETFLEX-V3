import { Box, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// icons

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CarouseItem from "../movies/CarouseItem";

import { getNowPlayingMovies } from "../../feutures/api/nowPlayingMovieSlice";
// == icons ==

export default function TrailerCarousel() {
  const carouselRef = useRef();
  const currentUrl = window.location.href;
  const [amount, setAmount] = useState(0);
  // const [playState, setPlayState] = useState(true);

  const nowPlayingMovies = useSelector((state) => {
    return state.nowPlayingMovies.movies;
  });

  const isLoading = useSelector((state) => {
    return state.nowPlayingMovies.isLoading;
  });

  const dispatch = useDispatch();

  function translateRight() {
    if (!isLoading && currentUrl === "http://localhost:3000/") {
      const childrenCount = carouselRef.current.children.length;
      if (amount > -childrenCount + 1) {
        setAmount((prev) => prev - 1);
      }
    }
  }

  function translateLeft() {
    if (!isLoading) {
      if (amount < 0) {
        setAmount((prev) => prev + 1);
      }
    }
  }

  // function autoPlay(play) {
  //   if (!isLoading) {
  //     const childrenCount = carouselRef.current.children.length;
  //     if (play) {
  //       setTimeout(() => {
  //         if (amount > -childrenCount + 1) {
  //           translateRight();
  //         } else {
  //           setAmount(0);
  //         }
  //       }, 4000);
  //     }
  //   }
  // }

  useEffect(() => {
    dispatch(getNowPlayingMovies(1));
  }, []);

  // useEffect(() => {
  //   if (!isLoading && currentUrl === "http://localhost:3000/") {
  //     autoPlay(playState);
  //   }
  //   return () => {
  //     setPlayState(false);
  //   };
  // }, [amount, isLoading, currentUrl, playState]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16/9",
          border: ".2rem #060015 solid",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Arrows */}

        {/* left arrow */}
        <IconButton
          sx={{ position: "absolute", left: 0, zIndex: "1" }}
          onClick={() => {
            translateLeft();
            // setPlayState(false);
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
            }}
          />
        </IconButton>
        {/* == left arrow == */}

        {/* right arrow */}
        <IconButton
          sx={{ position: "absolute", right: 0, zIndex: "1" }}
          onClick={() => {
            translateRight();
            // setPlayState(false);
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
        {!isLoading ? (
          <Box
            ref={carouselRef}
            sx={{
              minWidth: "100%",
              height: "100%",
              display: "flex",
              background: "black",
              transition: "0.5s ease-in-out",
              translate: `${amount * 100}%`,
            }}
          >
            {nowPlayingMovies.map((movie) => (
              <CarouseItem key={movie.id} movie={movie} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" size={100} />
          </Box>
        )}
      </Box>
    </>
  );
}
