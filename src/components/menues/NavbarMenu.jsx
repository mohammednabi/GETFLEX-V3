import React, { useState } from "react";
import { Box, IconButton, Typography, Drawer, Stack } from "@mui/material";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PeopleIcon from "@mui/icons-material/People";
// ===icons====
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  function handleOpen() {
    setOpen(false);
  }

  return (
    <>
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          gap: ".2rem",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon sx={{ fontSize: "1.5rem" }} />
        <Typography variant="h6">Menu</Typography>
      </IconButton>

      <Drawer anchor="top" open={open} onClose={handleOpen}>
        <Stack
          spacing={4}
          sx={{
            backgroundColor: theme.pallete.body.light,
            padding: "2rem 20rem",
            color: "white",
            maxHeight: "100vh",
            textTransform: "capitalize",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="/imgs/GITFLEX LOGO.png"
              alt=""
              style={{ width: "10rem" }}
            />
            <IconButton onClick={handleOpen} sx={{ color: "white" }}>
              <CloseIcon sx={{ fontSize: "3rem" }} />
            </IconButton>
          </Box>
          <Stack spacing={4} direction={"row"}>
            <Stack className="movies-stack" spacing={2}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <TheatersIcon
                  sx={{ fontSize: "2rem", color: theme.pallete.mygreen.main }}
                />
                <Typography variant="h4">movies</Typography>
              </Stack>
              <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                <Link
                  className="link"
                  to={"/top100"}
                  onClick={handleOpen}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">top 100 movies</Typography>
                </Link>
                <Link
                  className="link"
                  to={"/top100"}
                  onClick={handleOpen}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">
                    browse movies by categories
                  </Typography>
                </Link>
              </Stack>
            </Stack>

            <Stack className="watch-stack" spacing={2}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <LiveTvIcon
                  sx={{ fontSize: "2rem", color: theme.pallete.mygreen.main }}
                />
                <Typography variant="h4">watch</Typography>
              </Stack>
              <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                <Link
                  className="link"
                  to={"/top100"}
                  onClick={handleOpen}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">what to watch</Typography>
                </Link>
                <Link
                  className="link"
                  to={"/top100"}
                  onClick={handleOpen}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">
            latest trailers
                  </Typography>
                </Link>
              </Stack>
            </Stack>

            <Stack className="watch-stack" spacing={2}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <PeopleIcon
                  sx={{ fontSize: "2rem", color: theme.pallete.mygreen.main }}
                />
                <Typography variant="h4">community</Typography>
              </Stack>
              <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                <Link
                  className="link"
                  to={"/top100"}
                  onClick={handleOpen}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">help center</Typography>
                </Link>
           
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
