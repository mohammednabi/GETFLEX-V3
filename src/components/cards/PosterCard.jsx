import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Rating from "@mui/material/Rating";
import { green } from "@mui/material/colors";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PosterCard({ movie }) {
  //  const image ="https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg";

  return (
    <>
      <div
        className="overlay"
        style={{
          background: "rgba(13,12,17,.7)",
          // background: "linear-gradient(0deg, rgba(13,12,17,1) 4%, rgba(29,27,38,0) 100%)",
          color: "white",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          bottom: "0",
          zIndex: "2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100% ",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <img
            src={movie.big_image}
            alt=""
            style={{ height: "80%" }}
            loading="lazy"
          />
        </div>

        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: ".2rem",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "2.25rem ", xs: ".7rem" },
              fontWeight: "bold",
              color: "#cfffdd",
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "1.5rem ", xs: ".7rem" },
              fontWeight: "bold",
            }}
          >
            rating on imdb
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "1.4rem ", xs: ".7rem" },
              fontWeight: "bold",
            }}
          >
            ⭐{movie.rating}
          </Typography>
          {/* <Rating name="read-only" value={rating} readOnly /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-1rem",
            }}
          >
            <Link to={movie.trailer} target="_blank">
              <IconButton className="arrow" sx={{ color: "white" }}>
                <PlayCircleOutlineIcon
                  sx={{ fontSize: { md: "5rem", xs: "2rem" } }}
                />
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: { md: "1.5rem ", xs: ".7rem" },
                  }}
                >
                  watch the trailer
                </Typography>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
