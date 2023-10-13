import React from "react";
import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";

// icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function MainFotter() {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.pallete.primary.second,
          color: "white",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: ".5rem",
          padding: "1rem 0",
          position: "relative",
          overflowY: "hidden",
          backgroundImage: "url(/imgs/8084126_1155.svg)",
          backgroundSize: "cover",
          backgroundBlendMode: "soft-light",
          
        
          boxShadow: " 0px -5px 5px 0px #120620",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <IconButton>
            <YouTubeIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </IconButton>
          <IconButton>
            <GitHubIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </IconButton>
          {/* <IconButton>
            <FacebookIcon  sx={{ fontSize: "2.5rem", color: "white" }} />
          </IconButton> */}
          <IconButton>
            <LinkedInIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" className="footer-link">
            get GETFLEX App
          </Typography>
          <Typography variant="h6" className="footer-link">
            help
          </Typography>
          <Typography variant="h6" className="footer-link">
            GETFLEX Mega
          </Typography>
        </Box>
        <Box
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6">createrd by </Typography>
          <img
            src="/imgs/nebo offical white logo edited.png"
            alt=""
            style={{ width: "8rem" }}
          />
        </Box>
        <Box
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            textOverflow: "ellipsis",
          }}
        >
          <Typography variant="body2">©2021-2023 GETFLEX.com </Typography>
        </Box>
        {/* <img
          src="/imgs/8084126_1155.svg"
          alt=""
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            objectFit: "contain",
            width: "100%",
            mixBlendMode: "softlight",
          }}
        /> */}
      </Box>
    </>
  );
}
