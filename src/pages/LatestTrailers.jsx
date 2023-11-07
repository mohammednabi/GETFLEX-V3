import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LastTrailerCard from "../components/movies/LastTrailerCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingMovies,
  nextPage,
} from "../feutures/api/nowPlayingMovieSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LatestTrailers() {
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const nowPlayingMovies = useSelector((state) => {
    return state.nowPlayingMovies.movies;
  });

  const allPages = useSelector((state) => {
    return state.nowPlayingMovies.totalPages;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNowPlayingMovies(page));
  }, [page]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 83px - 221px + 1rem)",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "white", margin: "1rem 0", textAlign: "center" }}
      >
        <code>Latest Trailers</code>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Pagination
          count={allPages}
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
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        flexWrap={"wrap"}
        sx={{ gap: "2rem", marginBottom: "1rem" }}
      >
        {nowPlayingMovies.length > 0 ? (
          nowPlayingMovies.map((movie) => (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, type: "spring" }}
                exit={{ opacity: 0 }}
              >
                <LastTrailerCard movie={movie} page={page}/>{" "}
              </motion.div>
            </>
          ))
        ) : (
          <CircularProgress color="secondary" size={100} />
        )}
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Pagination
          count={allPages}
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
    </Box>
  );
}
