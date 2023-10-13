import { Badge, IconButton, Typography } from '@mui/material';
import React from 'react'

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useTheme } from '@emotion/react';

export default function WatchList()
{
    const theme = useTheme()
  return (
    <>
      <IconButton sx={{ color: "white", gap: ".2rem" }}>
        <BookmarksIcon />
        <Badge
          badgeContent={1}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
                  }}
                  
        >
          <Typography variant="h6">WatchList</Typography>
        </Badge>
      </IconButton>
    </>
  );
}
