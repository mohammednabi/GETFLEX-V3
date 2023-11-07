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
            width: "8rem",
            height: "8rem",
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
          />
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{}}>
          {name && (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                width: "10rem",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {name}
            </Typography>
          )}
          {character && (
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,.7)",
                textAlign: "center",
                width: "10rem",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {character}
            </Typography>
          )}
          {job && (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {job}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
