import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";

export default function CastCard({ profile, name, character, job }) {
  return (
    <>
      <Stack alignItems={"center"} spacing={1}>
        {/* another style for these  */}
        <Box
          sx={{
            width: { md: "8rem", xs: "5rem" },
            height: { md: "8rem", xs: "5rem" },
            border: ".3rem #060015 solid",
            borderRadius: "5rem",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5rem" }}
            alt=""
            src={
              profile
                ? `https://image.tmdb.org/t/p/original${profile}`
                : "https://images.generation-msx.nl/company/0388910c.png"
            }
            loading="lazy"
          />
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{}}>
          {name && (
            <Typography
              sx={{
                textAlign: "center",
                width: { md: "10rem", xs: "7rem" },
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: { md: "1.2rem", xs: ".8rem" },
              }}
            >
              {name}
            </Typography>
          )}
          {character && (
            <Typography
              sx={{
                color: "rgba(255,255,255,.7)",
                textAlign: "center",
                width: { md: "10rem", xs: "7rem" },
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: { md: "1rem", xs: ".6rem" },
              }}
            >
              {character}
            </Typography>
          )}
          {job && (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { md: "1rem", xs: ".6rem" },
              }}
            >
              {job}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
