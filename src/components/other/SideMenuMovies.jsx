import { Box } from '@mui/material';
import React from 'react'
import SideMovie from '../cards/SideMovie';

export default function SideMenuMovies() {
  return (
    <>
      <Box sx={{ backgroundColor: "#230c3e", width: "100%", height: "100%",display:{lg:"initial",xs:"none"} }}>
        <SideMovie />
        <SideMovie />
        <SideMovie />
      </Box>
    </>
  );
}
