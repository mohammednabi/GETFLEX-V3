import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export default function CompanyCard({ logo_path, companyName }) {
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Avatar
          alt=""
          src={
            logo_path !== null
              ? `https://image.tmdb.org/t/p/original${logo_path}`
              : "https://images.generation-msx.nl/company/0388910c.png"
          }
          sx={{
            background: "white",
            width: { md: "5rem", xs: "3rem" },
            height: { md: "5rem", xs: "3rem" },
          }}
        />
        <Typography
          sx={{
            color: "rgba(255,255,255,.8)",
            fontSize: { md: "1.2rem", xs: ".8rem" },
          }}
        >
          {companyName}
        </Typography>
      </Stack>
    </>
  );
}
