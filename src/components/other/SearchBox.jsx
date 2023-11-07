import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import SearchedMovie from "../cards/SearchedMovie";
import { MoviesContext } from "../../contexts/MoviesContext";
import { v4 as uuidv4 } from "uuid";

// icons
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedMovies } from "../../feutures/api/searchMovieSlice";
// ==icons==

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBox() {
  const [searched, setSearched] = useState();
  const [displayed, setDisplayed] = useState(false);
  const dispatch = useDispatch();
  const searchedMovies = useSelector((state) => {
    return state.searchedMovies.movies;
  });
  const isLoading = useSelector((state) => {
    return state.searchedMovies.isLoading;
  });

  const totalResults = useSelector((state) => {
    return state.searchedMovies.totalResults;
  });

  function cancelSearch() {
    setSearched(undefined);
  }

  function handleOpen() {
    setDisplayed(false);
  }

  useEffect(() => {
    if (searched) {
      setDisplayed(true);
      dispatch(getSearchedMovies(searched));
    } else {
      setDisplayed(false);
    }
  }, [searched]);

  return (
    <>
      <Box
        sx={{
          flexGrow: { md: 1, xs: 0 },
          display: { md: "initial", xs: "none" },
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searched}
            onChange={(e) => {
              setSearched(e.target.value);
            }}
          />
          {searched && (
            <Box
              sx={{
                width: "100%",

                maxHeight: "20rem",
                overflow: "auto",
                background: "#060015",
                // background: "red",
                padding: "1rem 0",
                position: "absolute",
                top: "2.5rem",
                zIndex: -1,
              }}
            >
              <Container>
                <Stack spacing={1}>
                  {isLoading ? (
                    <Stack alignItems={"center"} justifyContent={"center"}>
                      <CircularProgress color="secondary" size={100} />
                    </Stack>
                  ) : totalResults > 0 ? (
                    searchedMovies.map((m) => (
                      <Stack spacing={1} key={uuidv4()}>
                        <SearchedMovie movie={m} cancel={cancelSearch} />
                        <Divider sx={{ background: "rgba(255,255,255,.3)" }} />
                      </Stack>
                    ))
                  ) : (
                    <Typography variant="h6" sx={{ color: "white" }}>
                      No Results Found
                    </Typography>
                  )}
                </Stack>
              </Container>
            </Box>
          )}
        </Search>
      </Box>

      {/* this is the drawer that displayed only on small screens */}

      <IconButton
        color="secondary"
        sx={{ display: { md: "none", xs: "initial" } }}
        onClick={() => {
          setDisplayed(true);
        }}
      >
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
      <Drawer
        anchor="top"
        open={displayed}
        onClose={handleOpen}
        sx={{
          display: { md: "none", xs: "initial" },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ background: "#060015", padding: "1rem" }}
        >
          <InputBase
            placeholder="search..."
            sx={{ color: "white" }}
            fullWidth
            value={searched}
            onChange={(e) => {
              setSearched(e.target.value);
            }}
          />
          <IconButton color="secondary" onClick={() => setDisplayed(false)}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Stack>
        {searched && (
          <Box
            sx={{
              width: "100%",

              maxHeight: { md: "20rem", xs: "100%" },
              overflow: "auto",
              background: "#060015",
              // background: "red",
              padding: "1rem 0",
            }}
          >
            <Container>
              <Stack spacing={1}>
                {totalResults > 0 ? (
                  searchedMovies.map((m) => (
                    <Stack spacing={1} key={uuidv4()}>
                      <SearchedMovie movie={m} cancel={cancelSearch} />
                      <Divider sx={{ background: "rgba(255,255,255,.3)" }} />
                    </Stack>
                  ))
                ) : (
                  <Typography variant="h6" sx={{ color: "white" }}>
                    No Results Found
                  </Typography>
                )}
              </Stack>
            </Container>
          </Box>
        )}
      </Drawer>
    </>
  );
}
