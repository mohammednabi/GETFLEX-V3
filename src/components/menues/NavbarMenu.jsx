import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  Stack,
  Paper,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PeopleIcon from "@mui/icons-material/People";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        <MenuIcon sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }} />
        <Typography
          variant="h6"
          sx={{ fontSize: { md: "initial", xs: ".8rem" } }}
        >
          Menu
        </Typography>
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleOpen}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#060015",
            padding: "1rem ",
          },
        }}
      >
        <Stack
          spacing={4}
          sx={{
            color: "white",
            height: "100vh",
            textTransform: "capitalize",
            // border: ".1rem solid #1a0a2e",
            // borderColor: theme.pallete.mygreen.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to={"/"} onClick={handleOpen}>
              <img
                src="/imgs/GITFLEX LOGO.png"
                alt=""
                style={{ width: "10rem" }}
              />
            </Link>
            <IconButton onClick={handleOpen} color="secondary">
              <CloseIcon sx={{ fontSize: "3rem" }} />
            </IconButton>
          </Box>
          <Stack spacing={1} justifyContent={"flex-start"}>
            <Accordion
              sx={{ background: "#100020 !important", color: "white" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
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
              </AccordionSummary>
              <AccordionDetails>
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
                    to={"/categories"}
                    onClick={handleOpen}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography variant="h6">
                     dicover popular movies
                    </Typography>
                  </Link>
                </Stack>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion
              sx={{ background: "#100020 !important", color: "white" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <TheatersIcon
                    sx={{ fontSize: "2rem", color: theme.pallete.mygreen.main }}
                  />
                  <Typography variant="h4">series</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                  <Link
                    className="link"
                    to={"/top100series"}
                    onClick={handleOpen}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography variant="h6">top 100 series</Typography>
                  </Link>
                  <Link
                    className="link"
                    to={"/seriescategories"}
                    onClick={handleOpen}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography variant="h6">
                      browse series by categories
                    </Typography>
                  </Link>
                </Stack>
              </AccordionDetails>
            </Accordion> */}
            <Accordion
              sx={{ background: "#100020 !important", color: "white" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
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
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                  {/* <Link
                    className="link"
                    to={"/top100"}
                    onClick={handleOpen}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography variant="h6">what to watch</Typography>
                  </Link> */}
                  <Link
                    className="link"
                    to={"/latesttrailers"}
                    onClick={handleOpen}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography variant="h6">latest trailers</Typography>
                  </Link>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ background: "#100020 !important", color: "white" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
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
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1} sx={{ paddingLeft: "2.5rem" }}>
                  <Link className="link" to={"/help"} onClick={handleOpen}>
                    <Typography variant="h6">help center</Typography>
                  </Link>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
