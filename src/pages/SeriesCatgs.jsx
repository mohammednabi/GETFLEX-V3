import {
  Box,
  Chip,
  Container,
  MenuItem,
  Select,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import { v4 as uuidv4 } from "uuid";
import GenreCard from "../components/cards/GenreCard";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2";

// icons
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useLocation } from "react-router-dom";
import { SeriesContext } from "../contexts/SeriesContext";

// == icons ==
export default function SeriesCatgs() {
  const allSeries = useContext(SeriesContext);
  const [category, setCategory] = useState();
  const [isUp, setIsUp] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const cat = queryParams.get("cat");

  const allGenres = useMemo(() => {
    return allSeries.flatMap((movie) => movie.genre);
  }, [allSeries]);

  const filteredGenres = useMemo(() => {
    return allGenres.filter((g, index) => {
      if (allGenres.indexOf(g) === index) {
        return g;
      }
    });
  }, [allGenres]);

  const selectedGenre = useMemo(() => {
    return allSeries.filter((m) => {
      return m.genre.includes(category);
    });
  }, [allSeries, category]);

  const sortedSelectedGenre = useMemo(() => {
    return [...selectedGenre].sort((a, b) => {
      if (isUp) {
        // Ascending order
        return a.year.slice(0, 4) - b.year.slice(0, 4);
      } else {
        // Descending order
        return b.year.slice(0, 4) - a.year.slice(0, 4);
      }
    });
  }, [selectedGenre, isUp]);

  function toggleUp() {
    setIsUp(!isUp);
  }

  useEffect(() => {
    if (filteredGenres) {
      setCategory(filteredGenres[0]);
    }
  
  }, [filteredGenres]);

  useEffect(() => {
    if (allSeries.length > 0) {
      if (cat !== null) {
        setCategory(cat);
      } else {
        setCategory("Drama");
      }
    }
  }, []);
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1rem)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h3" sx={{ color: "white", margin: "1rem 0" }}>
            <code>Series Categories</code>
          </Typography>
          {category && (
            <Container maxWidth="md">
              <Grid
                container
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%" }}
              >
                <Grid
                  container
                  xs={6}
                  md={4}
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ display: { md: "initial", xs: "none" } }}
                >
                  <Box>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        color="secondary"
                        sx={{ color: "#59ec85" }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        label="category"
                        color="secondary"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        sx={{ color: "white" }}
                      >
                        {filteredGenres.map((g) => (
                          <MenuItem key={uuidv4()} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  container
                  xs={12}
                  md={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  {category && (
                    <Typography
                      variant="h5"
                      sx={{ color: "white", marginTop: "1rem" }}
                    >
                      <code style={{ color: "#59ec85", fontSize: "2rem" }}>
                        {category}
                      </code>{" "}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  container
                  xs={6}
                  md={4}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: { md: "none", xs: "initial" },
                    justifyContent: { md: "center", xs: "flex-start" },
                  }}
                >
                  <Box>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        color="secondary"
                        sx={{ color: "#59ec85" }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        label="category"
                        color="secondary"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        sx={{ color: "white" }}
                      >
                        {filteredGenres.map((g) => (
                          <MenuItem key={uuidv4()} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  container
                  xs={6}
                  md={4}
                  alignItems="center"
                  sx={{ justifyContent: { md: "center", xs: "flex-end" } }}
                >
                  <Button
                    sx={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1rem",
                      gap: ".5rem",
                    }}
                    variant="outlined"
                    color="secondary"
                    onClick={toggleUp}
                  >
                    <code>year</code>

                    <KeyboardDoubleArrowUpIcon
                      sx={{
                        color: "#59ec85",
                        transition: ".2s",
                        transform: isUp ? "" : "rotatez(180deg)",
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Container>
          )}

          <Stack
            flexWrap={"wrap"}
            direction={"row"}
            sx={{ gap: "1rem 2rem", marginBottom: "1rem" }}
            justifyContent={"center"}
          >
            {category ? (
              sortedSelectedGenre.map((movie) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, type: "spring" }}
                  key={uuidv4()}
                >
                  <GenreCard movie={movie} type="serie" />
                </motion.div>
              ))
            ) : (
              <Stack alignItems={"center"}>
                <CircularProgress color="secondary" size={100} />
              </Stack>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
