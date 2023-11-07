import React from "react";
import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

// icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function MainFotter() {
  const theme = useTheme();
  const facebookLink =
    "https://www.facebook.com/mohammed.nabil.1042/?viewas=&should_open_composer=false&show_switched_toast=false&show_invite_to_follow=false&show_switched_tooltip=false&show_podcast_settings=false&show_community_review_changes=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true&locale=ar_AR";

  const githubLink = "https://github.com/mohammednabi";
  const linkedInLink = "https://www.linkedin.com/in/mohammed-nabil-790b951b4/";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.pallete.primary.second,
          color: "white",
          // marginTop: "1rem",
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
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link to={facebookLink} target="blank">
            {/* <YouTubeIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            /> */}
            <FacebookIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </Link>
          <Link to={githubLink} target="blank">
            <GitHubIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </Link>
          {/* <IconButton>
            <FacebookIcon  sx={{ fontSize: "2.5rem", color: "white" }} />
          </IconButton> */}
          <Link to={linkedInLink} target="blank">
            <LinkedInIcon
              className="icon"
              sx={{ fontSize: "2.5rem", color: "white" }}
            />
          </Link>
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
          <Link className="link footer-link">
            <Stack direction={"row"} spacing={0.2} alignItems={"center"}>
              <Link to={"/getflexapp"} className="link">
                <Typography variant="h6">get GETFLEX App</Typography>
              </Link>
              <OpenInNewIcon sx={{ fontSize: "1.5rem" }} />
            </Stack>
          </Link>
          <Link to={"/help"} className="link">
            <Typography variant="h6" className="footer-link">
              help
            </Typography>
          </Link>
          <Link to={"/getflexmega"} className="link">
            <Typography variant="h6" className="footer-link">
              GETFLEX Mega
            </Typography>
          </Link>
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
