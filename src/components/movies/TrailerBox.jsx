import * as React from "react";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@emotion/react";

import { MoviesContext } from "../../contexts/MoviesContext";
import MyCarousel from "../other/MyCarousel";
import SideMenuMovies from "../other/SideMenuMovies";
import { movies } from "../other/TestingMovies";

const alternativeMoviesList = movies;

export default function TrailerBox() {
  const theme = useTheme();
  const myMovies = React.useContext(MoviesContext);

  const filteredMovies = React.useMemo(() => {
    if (myMovies.length !== 0) {
      return myMovies.filter((movie) => {
        return movie.rank <= 10;
      });
    } else {
      return alternativeMoviesList;
    }
  }, [myMovies]);

  const filteredMovies2 = React.useMemo(() => {
    return [...filteredMovies].sort((a, b) => a.rank - b.rank);
  }, [filteredMovies]);

  React.useEffect(() => {}, [filteredMovies]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background:
            "linear-gradient(180deg, rgba(12,17,15,0) 0%, rgba(25,8,46,1) 100%)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "-1",
            // filter: "grayscale()",
          }}
        >
          <img
            // src="https://images5.alphacoders.com/129/1299476.png"
            src="/imgs/8084126_1155.svg"
            alt=""
            style={{
              width: "100%",
              // height: "100%",
              filter: "blur(5px)",
            }}
            loading="lazy"
          />
        </Box>
        <MyCarousel movies={filteredMovies2} />

        <SideMenuMovies />
      </Box>
    </>
  );
}
