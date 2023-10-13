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
   
    if (myMovies.length !== 0)
    {
        return myMovies.filter((movie) => {
          return Number(movie.id.slice(3)) <= 10;
        });
    }
    else
    {
      return alternativeMoviesList
    }
    
  }, [myMovies]);

  React.useEffect(() => {
    console.log("this is filtered movies", filteredMovies);
  }, [filteredMovies]);

  return (
    <>
      {/* <Container maxWidth="xl" sx={{textAlign:"center",display:"flex",justifyContent:"flex-start",marginTop:"1rem"}}>

        <Typography variant="h4" sx={{color:"rgba(255,255,255,.9)",textTransform:"capitalize"}}> watch Top movies</Typography>
      </Container> */}
     
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        
    
        <MyCarousel movies={filteredMovies} />
        
        <SideMenuMovies />
      
</Box>
      
    </>
  );
}
