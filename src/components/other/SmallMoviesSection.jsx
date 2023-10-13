import React, { useRef, useState } from 'react'
import SmallMovie from '../cards/SmallMovie';
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { movies } from "../other/TestingMovies";

export default function SmallMoviesSection({caption})
{

 const myMovies= movies
  const divRef = useRef()
  const [displayButtons,setDisplayButtons]=useState(false)
  const theme = useTheme()




  function handleScrollLeft()
  {
   const scrollDistance = 1000; // Adjust the scroll distance as needed
   const currentScrollLeft = divRef.current.scrollLeft;
   const targetScrollLeft = currentScrollLeft - scrollDistance;

   divRef.current.scrollTo({
     left: targetScrollLeft,
     behavior: "smooth",
   });
  }

  function handleScrollRight()
  {
     const scrollDistance = 1000; // Adjust the scroll distance as needed
     const currentScrollLeft = divRef.current.scrollLeft;
     const targetScrollLeft = currentScrollLeft + scrollDistance;

     divRef.current.scrollTo({
       left: targetScrollLeft,
       behavior: "smooth",
     });
  }
  


  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            height: "3rem",
            width: ".2rem",
            backgroundColor: "#59ec85",
          }}
        ></Box>
        <Typography
          variant="h4"
          sx={{
            color: "rgba(255,255,255,.9)",
            textTransform: "capitalize",
            marginBottom: 5,
          }}
        >
          {" "}
          {caption}
        </Typography>
      </Container>
      <Stack spacing={2} direction={"row"} sx={{ position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", top: "30%", left: "0", zIndex: "1" }}
          onClick={handleScrollLeft}
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

        <div
          ref={divRef}
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            overflow: "auto",
            gap: "2rem",
            flexWrap: "nowrap",
            transition: "all .2s",
          }}
          onMouseOver={() => {
            setDisplayButtons(true);
          }}
          onMouseOut={() => {
            setDisplayButtons(false);
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            {myMovies.map((movie) => {
              return (
                <SmallMovie
                  key={movie.id}
                  movieImage={movie.image}
                  movieTitle={movie.title}
                  rating={movie.rating}
                  trailer={"movie.trailer"}
                />
              );
            })}
          </div>
        </div>
        <IconButton
          sx={{ position: "absolute", top: "30%", right: "0", zIndex: "1" }}
          onClick={handleScrollRight}
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
    </>
  );
}
