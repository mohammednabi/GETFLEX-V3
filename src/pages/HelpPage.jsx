import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function HelpPage() {
  const [inputValue, setInputValue] = useState("");
  const facebookLink =
    "https://www.facebook.com/mohammed.nabil.1042/?viewas=&should_open_composer=false&show_switched_toast=false&show_invite_to_follow=false&show_switched_tooltip=false&show_podcast_settings=false&show_community_review_changes=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true&locale=ar_AR";

  const githubLink = "https://github.com/mohammednabi";
  const linkedInLink = "https://www.linkedin.com/in/mohammed-nabil-790b951b4/";
  return (
    <>
      <Container sx={{ height: "calc(100vh - 83px - 221px + 1.7rem)" }}>
        {/* <Stack
          spacing={3}
          sx={{
            height: "100%",
            color: "white",
            alignItems: "center",
            justifyContent: "center",

            textTransform: "capitalize",
          }}
        >
          <Typography variant="h5">send us an email</Typography>
          <TextField
            variant="filled"
            color="secondary"
            fullWidth
            sx={{ color: "white" }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></TextField>

          <Button color="secondary">send</Button>
          <Typography variant="h6">or you can contact us here</Typography>
        </Stack> */}
        <Stack
          spacing={3}
          sx={{
            height: "100%",
            color: "white",
            alignItems: "center",
            justifyContent: "center",

            textTransform: "capitalize",
          }}
        >
          <Typography variant="h3">
            <code> You Can Find Us Here</code>
          </Typography>
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
              <FacebookIcon
                className="icon"
                sx={{ fontSize: "5.5rem", color: "white" }}
              />
            </Link>
            <Link to={githubLink} target="blank">
              <GitHubIcon
                className="icon"
                sx={{ fontSize: "5.5rem", color: "white" }}
              />
            </Link>
            {/* <IconButton>
            <FacebookIcon  sx={{ fontSize: "2.5rem", color: "white" }} />
          </IconButton> */}
            <Link to={linkedInLink} target="blank">
              <LinkedInIcon
                className="icon"
                sx={{ fontSize: "5.5rem", color: "white" }}
              />
            </Link>
          </Box>
          <Typography variant="h4">
            <code> Contact Us</code>
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
