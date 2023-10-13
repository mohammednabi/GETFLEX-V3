import React from 'react'

import Paper from "@mui/material/Paper";
import { useTheme } from '@emotion/react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export default function SmallMovie({ movieImage,movieTitle, rating, trailer }) {
  const theme = useTheme();

  const image = movieImage

  return (
    <>
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
        <BookmarkAddIcon
          sx={{
            display: { md: "none", xs: "initial" },
            position: "absolute",
            fontSize: "2rem",
            // mixBlendMode:"multiply",
            color: "rgba(255,255,255,.9)",
            top: 0,
            left: 0,
            cursor: "pointer",
          }}
        />

        <img src={image} alt="" style={{ height: "auto", width: "100%" }} />

        <Box
          sx={{
            position: "relative",
            backgroundColor: theme.pallete.primary.second,
            color: "rgba(255,255,255,.9)",
            // padding: "1rem",
            overflow: "hidden",
            height: { md: "15rem" ,xs:"8rem"},
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

              width: "100%",
              height: "100%",
              objectFit: "cover",
              mixBlendMode: "soft-light",
            }}
          />
          <Stack spacing={1} sx={{ padding: "1rem" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              ⭐ {rating}
            </Typography>

            <Typography
              sx={{
                textOverflow: "",
                fontSize: { lg: "1.1rem", md: "1rem", xs: ".55rem" },
                fontWeight: "bold",
                textAlign: "center",
                height: {md:"4rem",xs:"1.8rem"},
              }}
            >
              {movieTitle}
            </Typography>

            <Button
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <AddIcon />
              Watchlist
            </Button>
            <Button sx={{ color: "rgba(255,255,255,.9)" }}>
              <PlayCircleOutlineIcon sx={{ fontSize: "2rem" }} />
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", md: "initial" } }}
              >
                trailer
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
