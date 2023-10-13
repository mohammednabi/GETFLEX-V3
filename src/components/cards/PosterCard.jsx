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
  
export default function PosterCard({posterImage,rating,movieTitle,posterID}) {

//  const image ="https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg";
const image = posterImage
const [trailer,setTrailer]=React.useState("")
  
  
 
  
  async function getTrailer(id)
  {
   const options = {
     method: "GET",
     url: `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
     headers: {
       "X-RapidAPI-Key": "65e2968530mshf9bcb301aced9e3p1111c6jsn1a36b24d55b4",
       "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
     },
   };

   try {
     const response = await axios.request(options);
   setTrailer(response.data.trailer)
   } catch (error) {
     console.error(error);
   }
  }


  React.useEffect(() => {
    getTrailer(posterID);
  }, [posterID]);
  

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
            <img src={image} alt="" style={{ height: "80%" }} />
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
              {movieTitle}
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
              ⭐{rating}
            </Typography>
            {/* <Rating name="read-only" value={rating} readOnly /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "-1rem",
              }}
            >
              <a href={trailer} target="blank">
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
              </a>
            </div>
          </div>
        </div>
      </>
    );
}
