import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Catgs from "./pages/Catgs";
import MainLayout from "./layouts/MainLayout";
import WatchlistPage from "./pages/WatchlistPage";

import FullMovies from "./pages/FullMovies";
import Top100Movies from "./pages/Top100Movies";
import GetflexMega from "./pages/GetflexMega";
import HelpPage from "./pages/HelpPage";

import Top100Series from "./pages/Top100Series";
import SeriesCatgs from "./pages/SeriesCatgs";
import TrailerScreen from "./components/other/TrailerScreen";
import LatestTrailers from "./pages/LatestTrailers";
import WhatToWatchPage from "./pages/WhatToWatchPage";
import WatchSomeVideos from "./pages/WatchSomeVideos";
import GetFlexApp from "./pages/GetFlexApp";

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

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trailerKey = queryParams.get("watchtrailer");

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      
    } else {
      localStorage.setItem("movies", "[]");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TrailerScreen trailerKey={trailerKey} />

        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />}></Route>
            <Route path="categories" element={<Catgs />} />
            <Route path="seriescategories" element={<SeriesCatgs />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="movie" element={<FullMovies />} />
            <Route path="top100" element={<Top100Movies />} />
            <Route path="top100series" element={<Top100Series />} />
            <Route path="getflexapp" element={<GetFlexApp />} />
            <Route path="getflexmega" element={<GetflexMega />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="latesttrailers" element={<LatestTrailers />} />
            <Route path="whattowatch" element={<WhatToWatchPage />} />
            <Route path="watchsomevideos" element={<WatchSomeVideos />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
