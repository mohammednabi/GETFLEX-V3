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
            width: "5rem",
            height: "5rem",
          }}
        />
        <Typography variant="h6" sx={{ color: "rgba(255,255,255,.8)" }}>
          {companyName}
        </Typography>
      </Stack>
    </>
  );
}
