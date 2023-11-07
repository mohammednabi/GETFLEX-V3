import { Container, Stack, Typography } from '@mui/material';
import React from 'react'

export default function GetflexMega() {
  return (
    <>
      <Container sx={{ height: "calc(100vh - 83px - 221px + 1rem)" }}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ color: "white", fontFamily: "", fontSize: "4.2rem" }}
          >
            GETFLEX{" "}
            <span style={{ color: "#a5112c", fontSize: "4.5rem" }}>Mega</span>
          </Typography>
          <Typography variant="h4" sx={{ color: "white" }}>
            Coming Soon
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
