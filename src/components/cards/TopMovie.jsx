import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Unstable_Grid2";

export default function TopMovie({ movie, type, index }) {
  return (
    <>
      <Container>
        <Grid
          container
          direction={"row"}
          spacing={2}
          sx={{
            alignItems: "center",
            //   border: "1px white solid",
            padding: "1rem",
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <Grid md={0.5} xs={1} sx={{}}>
            <Typography sx={{ fontSize: { md: "1.2rem", xs: ".7rem" } }}>
              {index + 1}
            </Typography>
          </Grid>
          <Grid md={1.5} xs={4}>
             <Link
                to={
                  type === "serie"
                    ? `/movie?watchserie=${movie.id}`
                    : `/movie?watchmovie=${movie.id}`
                }
               
              >
            <Box sx={{ width: { md: "5rem", xs: "4rem" } }}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt=""
                style={{ width: "100%", border: "1px solid #59ec85" }}
              />
              </Box>
              </Link>
          </Grid>
          <Grid md={7} xs={7}>
            <Stack spacing={0.5} sx={{ color: "white" }}>
              <Link
                to={
                  type === "serie"
                    ? `/movie?watchserie=${movie.id}`
                    : `/movie?watchmovie=${movie.id}`
                }
                className="link"
              >
                <Typography sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}>
                  {movie.title}
                </Typography>
              </Link>
              <Typography sx={{ fontSize: { md: "1rem", xs: ".5rem" } }}>
                {movie.release_date}
              </Typography>
              <Typography sx={{ fontSize: { md: "1.2rem", xs: ".7rem" } }}>
                ⭐{movie.vote_average.toFixed(1)}
              </Typography>
            </Stack>
          </Grid>

          <Grid md={3} xs={12}>
            <Stack direction={"row"} spacing={1}>
              {/* {movie.genre.map((g) => (
                <Link to={`/categories?cat=${g}`} key={uuidv4()}>
                  <Chip
                    label={g}
                    variant="outlined"
                    sx={{ color: "white" }}
                    className="chipy"
                  />
                </Link>
              ))} */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
