import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import TrailerCarousel from "../other/TrailerCarousel";
import SideMenuMoviesForTrailers from "../other/SideMenuMoviesForTrailers";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function TrailBox2() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: "-1",
          backgroundImage: "url(/imgs/8084126_1155.svg)",
          backgroundSize: "cover",

          filter: "grayscale()",
        }}
      ></Box>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, type: "spring" }}
        exit={{ opacity: 0 }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            padding: "1rem",
            background:
              "linear-gradient(180deg, rgba(12,17,15,0) 0%, rgba(25,8,46,1) 100%)",
            position: "relative",
          }}
        >
          <Grid lg={1.25} xs={0}>
            <img
              alt=""
              src="/imgs/popcorn.png"
              style={{
                width: "100%",
                transformOrigin: "center",
                translate: "45% 42%",
                transform: "rotatez(-45deg) ",
                filter: "contrast(85%)",
              }}
            />
          </Grid>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            lg={8.5}
            md={11}
            xs={12}
            sx={{ position: "relative", zIndex: "4" }}
          >
            <TrailerCarousel />
          </Grid>
          <Grid lg={1.25} xs={0}>
            <img
              alt=""
              src="/imgs/popcorn.png"
              style={{
                width: "100%",
                transformOrigin: "center",
                transform: "rotatey(180deg) translatex(42%) rotatez(-45deg)",
                filter: "contrast(85%)",
              }}
            />
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
