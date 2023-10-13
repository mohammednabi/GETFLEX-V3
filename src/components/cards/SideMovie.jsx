import React from 'react'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useTheme } from '@emotion/react';


export default function SideMovie({trailer}) {

    const theme =useTheme()
  return (
    <>
      <Box sx={{ padding:2 ,margin: 1 ,backgroundColor:theme.pallete.primary.second}}>
        <Stack direction={"row"} spacing={2}>
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
            alt=""
            style={{ width: "5rem" }}
          />
          <Stack spacing={2} sx={{ color: "white", justifyContent: "center" }}>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: { md: "1.5rem ", xs: ".7rem" },
              }}
            >
              the dark Knight
                      </Typography>
                     
            <a href={trailer} target="blank">
              <IconButton className="arrow" sx={{ color: "white" }}>
                <PlayCircleOutlineIcon
                  sx={{ fontSize: { md: "2rem", xs: "2rem" } }}
                />
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: { md: "1rem ", xs: ".7rem" },
                  }}
                >
                  watch the trailer
                </Typography>
              </IconButton>
            </a>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
