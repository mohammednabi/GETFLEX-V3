import React, { useContext, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import PosterCard from "../cards/PosterCard";
import { MoviesContext } from "../../contexts/MoviesContext";
import { v4 as uuidv4 } from "uuid";

export default function MyCarousel({ movies }) {
  const theme = useTheme();

  const [amount, setAmount] = useState(0);
  const landscapePosters = [
    "https://aworldoffilm.files.wordpress.com/2014/06/wall2.jpg",
    "https://cmon-files.s3.amazonaws.com/images/news/image_social/187/SM-Game-vs-Movie_2.jpg",
    "https://preview.redd.it/vedjoch1jv651.jpg?width=640&crop=smart&auto=webp&s=28a95089e9b8352cc163a047fd6f8f6c099cf317",
    "https://pbs.twimg.com/media/D2NxypoW0AAlJn-.jpg",
    "https://picfiles.alphacoders.com/990/99096.jpg",
    "https://facts.net/wp-content/uploads/2023/06/48-facts-about-the-movie-schindlers-list-1687269412.jpeg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f09c09135218605.61e444b9dfc4f.png",
    "https://cdn.mos.cms.futurecdn.net/7EBAh8MhuwWSZnV3uWobxH-1200-80.jpg",
    "https://www.tallengestore.com/cdn/shop/products/LordOfTheRings-FellowshipOfTheRing-HollywoodMoviePoster_2770e0df-8b6b-4580-948d-7256db04e257.jpg?v=1630764645",
    "https://deependsongs.files.wordpress.com/2020/07/r-7385906-1497985374-3800.jpeg.jpg",
  ];

  function translateImagesRight() {
    if (amount > -(movies.length * 100 - 100)) {
      setAmount((c) => {
        return c - 100;
      });
    }
  }

  function translateImagesLeft() {
    if (amount < 0) {
      setAmount((c) => {
        return c + 100;
      });
    }
  }

  function autoPlay() {
    setTimeout(() => {
      if (amount > -(movies.length * 100)) {
        setAmount((c) => {
          return c - 100;
        });
      } else {
        setAmount(0);
      }
    }, 4000);
  }

  useEffect(() => {
    // autoPlay();
  }, [amount]);

  useEffect(() => {
    setAmount(0);
  }, []);

  return (
    <Box
      className="trailer-carousel"
      sx={{
        width: { md: "70%", xs: "100%" },
        height: "auto",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <IconButton onClick={translateImagesLeft}>
        <ArrowBackIosNewIcon
          className="arrow"
          sx={{
            color: "white",
            fontSize: { md: 50, xs: 10 },
            backgroundColor: "rgb(0,0,0,.5) ",
            border: "solid 1px  #59ec85",
            height: { md: "5rem", xs: "2rem" },
            position: "absolute",
            zIndex: "1",
            left: "5%",
          }}
        />
      </IconButton>
      <div
        style={{
          width: "80%",

          aspectRatio: "16/9",
          display: "flex",
          overflow: "hidden",
          border: `5px ${theme.pallete.borders.main} solid`,
        }}
      >
        {movies &&
          movies.map((movie, index) => {
            return (
              <div
                key={movie.rank}
                style={{
                  transition: "all .5s",
                  transform: `translate(${amount}%,0)`,
                }}
              >
                <img
                  src={landscapePosters[index]}
                  alt=""
                  style={{ height: "100%", aspectRatio: "16/9" }}
                  loading="lazy"
                />
                <PosterCard movie={movie} />
              </div>
            );
          })}
      </div>
      <IconButton onClick={translateImagesRight}>
        <ArrowBackIosNewIcon
          className="arrow"
          sx={{
            color: "white",
            fontSize: { md: 50, xs: 10 },
            transform: "rotate(180deg)",
            backgroundColor: "rgb(0,0,0,.5) ",
            border: "solid 1px  #59ec85",
            height: { md: "5rem", xs: "2rem" },
            position: "absolute",
            zIndex: "1",
            right: "5%",
          }}
        />
      </IconButton>
    </Box>
  );
}
