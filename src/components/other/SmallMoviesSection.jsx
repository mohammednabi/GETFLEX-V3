import React, { useRef, useState } from "react";
import SmallMovie from "../cards/SmallMovie";

import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
// import { movies } from "../other/TestingMovies";
import { v4 as uuidv4 } from "uuid";

export default function SmallMoviesSection({ caption, movies, backColor }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const divRef = useRef();
  const [displayButtons, setDisplayButtons] = useState(false);

  function handleScrollLeft() {
    const scrollDistance = isMediumScreen ? 500 : isSmallScreen ? 200 : 800; // Adjust the scroll distance as needed
    const currentScrollLeft = divRef.current.scrollLeft;
    const targetScrollLeft = currentScrollLeft - scrollDistance;

    divRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }

  function handleScrollRight() {
    const scrollDistance = isMediumScreen ? 500 : isSmallScreen ? 200 : 800; // Adjust the scroll distance as needed
    const currentScrollLeft = divRef.current.scrollLeft;
    const targetScrollLeft = currentScrollLeft + scrollDistance;

    divRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }

  return (
    <Box sx={{ background: backColor, padding: "2rem 0" }}>
      <Container
        maxWidth="xl"
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",

          gap: "1rem",
        }}
      >
        <Box
          sx={{
            height: { md: "3rem", xs: "2rem" },
            width: ".2rem",
            backgroundColor: "#59ec85",
          }}
        ></Box>
        <Typography
          variant={isSmallScreen ? "h6" : "h4"}
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
      {movies && (
        <Stack spacing={2} direction={"row"} sx={{ position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: "30%",
              left: "0",
              zIndex: "1",
              display: { md: "initial", xs: "none" },
            }}
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
              {movies &&
                movies.map((movie) => {
                  return <SmallMovie key={uuidv4()} movie={movie} />;
                })}
            </div>
          </div>
          <IconButton
            sx={{
              position: "absolute",
              top: "30%",
              right: "0",
              zIndex: "1",
              display: { md: "initial", xs: "none" },
            }}
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
      )}
    </Box>
  );
}
