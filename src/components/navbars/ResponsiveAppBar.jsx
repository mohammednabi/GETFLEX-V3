import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import { useTheme } from "@emotion/react";
import SearchBox from "../other/SearchBox";
import NavbarMenu from "../menues/NavbarMenu";

import WatchList from "../other/WatchList";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

function ResponsiveAppBar() {
  const theme = useTheme();

  // const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: `${theme.pallete.primary.forth}`,
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",

            gap: "1rem",
          }}
        >
          <Link to={"/"}>
            <Box sx={{ width: { md: "10rem", xs: "5rem" } }}>
              <img
                src="/imgs/GITFLEX LOGO.png"
                style={{ width: "100%" }}
                alt=""
                loading="lazy"
              />
            </Box>
          </Link>
          <NavbarMenu />
          <SearchBox />
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ alignItems: "center", display: { md: "flex", xs: "none" } }}
          >
            <Link to={"/getflexmega"}>
              <IconButton
                sx={{ color: "white", fontFamily: "", fontSize: "1.2rem" }}
              >
                GETFLEX{" "}
                <span style={{ color: "#a5112c", fontSize: "1.5rem" }}>
                  Mega
                </span>
              </IconButton>
            </Link>
            <Box
              sx={{ height: "2rem", width: ".1rem", backgroundColor: "white" }}
            ></Box>
            <WatchList />
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ alignItems: "center", display: { xs: "flex", md: "none" } }}
          >
            <WatchList />
          </Stack>
          <Link to={"/getflexapp"} className="search-link">
            <Button
              sx={{
                display: {
                  md: "none",
                  xs: "initial",
                },
                backgroundColor: "#09b05c",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              app ⇩
            </Button>
          </Link>
        </Box>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
