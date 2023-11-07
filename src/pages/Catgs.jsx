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
  Pagination,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import { v4 as uuidv4 } from "uuid";
import GenreCard from "../components/cards/GenreCard";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2";

// icons
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../feutures/api/topRatedMoviesSlice";
import { getFiltered, getPopularMovies } from "../feutures/api/popularMoviesSlice";
import {
  getMoviesGenres,
  selectChip,
  selectSpecificChip,
} from "../feutures/api/moviesGenresSlice";
import { getUpComingMovies } from "../feutures/api/UpComingMoviesSlice";
import { getFilteredNowPlaying } from "../feutures/api/nowPlayingMovieSlice";

// == icons ==
export default function Catgs() {
  // const [category, setCategory] = useState();
  const [order, setOrder] = useState();
  const [moviesTypes, setMoviesTypes] = useState();
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [isUp, setIsUp] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get("cat");

  const allTypes = useMemo(() => {
    return ["Now playing", "Popular", "Top rated", "UpComing"];
  }, []);

  const orders = useMemo(() => {
    return [
      // "Popularity Ascending",
      // "Popularity Descending",
      "Rating Ascending",
      "Rating Descending",
      "Year Ascending",
      "Year Descending",
      "Title (A-Z)",
      "Title (Z-A)",
    ];
  }, []);

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => {
    return state.genres.genres;
  });

  const allCategoriesLoading = useSelector((state) => {
    return state.genres.isLoading;
  });

  const selectedCategories = useSelector((state) => {
    return state.genres.selectedGenres;
  });

  const popularMovies = useSelector((state) => {
    return state.popularMovies.filteredMovies;
  });

  const popularMoviesLoading = useSelector((state) => {
    return state.popularMovies.isLoading;
  });

  // const nowPlayingMovies = useSelector((state) =>
  // {
  //   return state.nowPlayingMovies.filteredMovies2
  // })

  // const topRatedMovies = useSelector((state) =>
  // {
  //   return state.topRatedMovies.filteredMovies
  // })

  // const upComingMovies = useSelector((state) =>
  // {
  //   return state.upComingMovies.filteredMovies
  // })

  useEffect(() => {
    setOrder(orders[0]);
    setMoviesTypes(allTypes[1]);
  }, [orders, allTypes]);

  useEffect(() => {
    if (!popularMoviesLoading && !allCategoriesLoading && allCategories) {
      if (cat !== null) {
        // dispatch(selectSpecificChip({ name: cat }));
        // console.log("cat : ", cat);
        // console.log("selected ", selectedCategories);
      }
    }
  }, [cat]);

  useEffect(() => {
    dispatch(getPopularMovies(page));
    // dispatch(getTopRatedMovies(page));
    // dispatch(getUpComingMovies(page));
    dispatch(getMoviesGenres());
  }, [page]);

  useEffect(() => {
    if (!popularMoviesLoading && !allCategoriesLoading && allCategories) {
      if (cat !== null) {
        dispatch(selectChip({ name: cat }));
      }
    }
  }, []);


  useEffect(() =>
  {
    // console.log(selectedCategories)
    dispatch(getFiltered({selectedGenres:selectedCategories,sortBy:order}))
    // dispatch(getFilteredNowPlaying({selectedGenres:selectedCategories,sortBy:order}))
  },[selectedCategories,order])

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
            <code>Movies </code>
          </Typography>
          {!popularMoviesLoading ? (
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
                  <Stack spacing={2} direction={"row"}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        color="secondary"
                        sx={{ color: "#59ec85" }}
                      >
                        Sort By
                      </InputLabel>
                      <Select
                        label="category"
                        color="secondary"
                        value={order}
                        onChange={(e) => {
                          setOrder(e.target.value);
                        }}
                        sx={{ color: "white", borderColor: "white" }}
                      >
                        {orders.map((g) => (
                          <MenuItem key={uuidv4()} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid
                  container
                  xs={12}
                  md={4}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mb: 2 }}
                >
                  {allCategories && moviesTypes && (
                    <Typography
                      variant="h5"
                      sx={{ color: "white", marginTop: "1rem" }}
                    >
                      <code style={{ color: "#59ec85", fontSize: "2rem" }}>
                        {moviesTypes}
                      </code>{" "}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  container
                  xs={12}
                  md={4}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: { md: "none", xs: "initial" },
                    justifyContent: { md: "center", xs: "flex-start" },
                    padding: {xs:"0 5rem"},
                    mb:3
                  }}
                >
                  <Box>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        color="secondary"
                        sx={{ color: "#59ec85" }}
                      >
                        Order
                      </InputLabel>
                      <Select
                        label="category"
                        color="secondary"
                        value={order}
                        onChange={(e) => {
                          setOrder(e.target.value);
                        }}
                        sx={{ color: "white" }}
                      >
                        {orders.map((g) => (
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
                  {/* <FormControl variant="outlined" fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      color="secondary"
                      sx={{ color: "#59ec85" }}
                    >
                      Type
                    </InputLabel>
                    <Select
                      label="type"
                      color="secondary"
                      value={moviesTypes}
                      onChange={(e) => {
                        setMoviesTypes(e.target.value);
                      }}
                      sx={{ color: "white", borderColor: "white" }}
                    >
                      {allTypes.map((g) => (
                        <MenuItem key={uuidv4()} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
              </Grid>
            </Container>
          ) : (
            <CircularProgress color="secondary" size={100} />
          )}
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ gap: "1rem" }}
          >
            {allCategories &&
              allCategories.map((c) => (
                <div
                  key={c.name}
                  style={{ cursor: "pointer" }}
                  className=""
                  onClick={() => {
                    dispatch(selectChip({ name: c.name }));
                  }}
                >
                  <Chip
                    label={c.name}
                    variant="outlined"
                    sx={{ color: "white" }}
                    className={c.selected ? "chip-selected" : ""}
                  />
                </div>
              ))}
          </Stack>
          <Stack
            flexWrap={"wrap"}
            direction={"row"}
            sx={{ gap: "1rem 2rem", marginBottom: "1rem" }}
            justifyContent={"center"}
          >
            {/* popular movies genre cards */}
            {allCategories && popularMovies && moviesTypes==="Popular" ? (popularMovies.length>0 ?(
              popularMovies.map((movie) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, type: "spring" }}
                  key={uuidv4()}
                >
                  <GenreCard movie={movie} />
                </motion.div>
              ))
            ) : <Typography variant="h6" sx={{color:"white"}}>
                <code>
                  
              This Genre Doesn't exist in this page
              </code>
                
            </Typography>): (
              <Stack alignItems={"center"}>
                <CircularProgress color="secondary" size={100} />
              </Stack>
            )}
            {/*== popular movies genre cards ==*/}
             {/* nowPlaying movies genre cards
            {allCategories && nowPlayingMovies && moviesTypes==="Now playing"? (nowPlayingMovies.length>0 ?(
              nowPlayingMovies.map((movie) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, type: "spring" }}
                  key={uuidv4()}
                >
                  <GenreCard movie={movie} />
                </motion.div>
              ))
            ) : <Typography variant="h6" sx={{color:"white"}}>
                <code>
                  
              This Genre Doesn't exist in this page
              </code>
                
            </Typography>): (
              <Stack alignItems={"center"}>
                <CircularProgress color="secondary" size={100} />
              </Stack>
            )} */}
            {/*== nowPlaying movies genre cards == */}
          </Stack>
          <Pagination
            count={500}
            page={page}
            color="secondary"
            size="large"
            sx={{
              mb: 5,
              "& .MuiPaginationItem-root": {
                color: "rgba(255,255,255,.5)",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "white",
              },
            }}
            showFirstButton
            showLastButton
            onChange={handleChangePage}
          />
        </Box>
      </Container>
    </>
  );
}
