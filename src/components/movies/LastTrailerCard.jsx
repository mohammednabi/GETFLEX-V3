import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Link } from "react-router-dom";

export default function LastTrailerCard({ movie ,page}) {
  const overlayRef = useRef();
  const buttonRef = useRef();

  return (
    <>
      {" "}
      <Link
        to={`/watchsomevideos?${"watchmovie"}=${movie.id}&&page=${page}`}
        style={{
          textDecoration: "none",

          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
          <Box
            sx={{
              maxWidth: { xs: "25rem" },
              aspectRatio: "16/9",
              background: "black",
              overflow: "hidden",
              position: "relative",
              border: "#060015 2px solid",
              boxShadow: "10px 2px 20px 0px black",
            }}
          >
            <img
              alt=""
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/imgs/8084126_1155.svg"
              }
              style={{
                width: "100%",
                height: "100%",
                //   objectFit: "cover",
                background: "rgba(255,255,255,.2)",
              }}
            />
            {/* <Box
              sx={{
                position: "absolute",
                top: ".5rem",
                left: ".5rem",
                width: "5rem",
                // aspectRatio: "9/16",
              }}
            >
              <img
                alt=""
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{
                  width: "100%",
                  height: "100%",
                  //   objectFit: "cover",
                  background: "#060015",
                  border: "3px solid #060015",
                }}
              />
            </Box> */}

            <Typography
              variant="body2"
              sx={{
                color: "white",
                position: "absolute",
                left: ".8rem",
                bottom: ".8rem",
              }}
            >
              {movie.release_date}
            </Typography>
            <div
              ref={overlayRef}
              style={{
                background: "rgba(0,0,0,.2)",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                cursor: "pointer",
                transition: ".1s",
              }}
              onMouseOver={() => {
                overlayRef.current.style.background = "rgba(0,0,0,.4)";
                buttonRef.current.style.color = "#59ec85";
              }}
              onMouseLeave={() => {
                overlayRef.current.style.background = "rgba(0,0,0,.2)";
                buttonRef.current.style.color = "white";
              }}
            />
            <IconButton
              ref={buttonRef}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: "white",
                transition: ".1s",
              }}
              onMouseOver={() => {
                overlayRef.current.style.background = "rgba(0,0,0,.4)";
                buttonRef.current.style.color = "#59ec85";
              }}
              onMouseLeave={() => {
                overlayRef.current.style.background = "rgba(0,0,0,.2)";
                buttonRef.current.style.color = "white";
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
          </Box>
          <Typography variant="h5" sx={{ color: "white", textAlign: "center" }}>
            {movie.title}
          </Typography>
        </Stack>
      </Link>
    </>
  );
}
