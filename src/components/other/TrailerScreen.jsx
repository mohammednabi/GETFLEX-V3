import { Backdrop, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function TrailerScreen({ trailerKey }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trailerKey !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [trailerKey]);

  return (
    <>
      <Link to={""}>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: 5,
            background: "rgba(0,0,0,.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              width="70%"
              // src={`https://www.youtube.com/embed/${
              //   movieVideos ? movieVideos.key : ""
              // }`}
              src={`https://www.youtube.com/embed/${
                trailerKey ? trailerKey : ""
              }`}
              // src={targetMovie.trailer}
              // src={movieDetails.homepage}
              title="YouTube Video"
              allowFullScreen
              style={{ border: "0", marginTop: "5rem", aspectRatio: "16/9" }}
            ></iframe>
          </Box>
        </Backdrop>
      </Link>
    </>
  );
}
