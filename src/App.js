import { Container } from "@mui/material";
import "./App.css";
// import Example from './components/movies/Example';



import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from 'axios'
import { MoviesContext } from "./contexts/MoviesContext";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catgs from "./pages/Catgs";
import MainLayout from "./layouts/MainLayout";






const theme = createTheme({
  pallete: {
    primary: {
      main: "#4a148c",
      second: "#270b49",
      third: "#35135c",
      forth: "#060015",
    },
    red: "#a5112c",
    mygreen: { main: "#59ec85" },
    borders: {
      main: "#230c3e",
    },
    body: {
      main: "#19082e",
      light: "#1e0b36",
    },
  },

  typography: {
    fontFamily: "arial",
  },
});

function App()
{
  const [movies,setMovies]=useState([])

const options = {
  method: "GET",
  url: "https://imdb-top-100-movies.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "65e2968530mshf9bcb301aced9e3p1111c6jsn1a36b24d55b4",
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};
  
  async function getMovies()
  {
        try {
          const response = await axios.request(options);
          setMovies(response.data)
	console.log(response.data);
} catch (error) {
	console.error(error);
}
  }

  useEffect(() =>
  {
    console.log("from api")
getMovies();
  },[])

  return (
    <>
      <ThemeProvider theme={theme}>
        <MoviesContext.Provider value={movies}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />}></Route>
              <Route path="categories" element={<Catgs />}></Route>
            </Route>
          </Routes>
        </MoviesContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
