import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function GetFlexApp() {
  return (
    <>
      <Container
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1.7rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
          <Link to={"/"}>
            <img
              alt=""
              src="/imgs/G LOGO.png "
              className="G-logo"
              loading="lazy"
            />
          </Link>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { md: "2rem", xs: "1.5rem" },
                textAlign: "center",
              }}
            >
              <code>Comming Soon on </code>
            </Typography>

            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/732/732208.png"
              style={{ width: "4rem" }}
              loading="lazy"
            />
            <Typography
              sx={{
                color: "white",
                fontSize: { md: "2rem", xs: "1.5rem" },
                textAlign: "center",
              }}
            >
              <code>and </code>
            </Typography>
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png"
              style={{ width: "4rem" }}
              loading="lazy"
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
