import { Badge, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function WatchList() {
  // const [number, setNumber] = useState(0);

  // const number2 = useMemo(() => {
  //   if (localStorage.getItem("movies")) {
  //     return JSON.parse(localStorage.getItem("movies")).length;
  //   }
  // }, [localStorage]);

  const number = useSelector((state) => state.toBeWatch.value);

  return (
    <>
      <Link to={"/watchlist"} style={{ textDecoration: "none" }}>
        <IconButton
          sx={{
            color: "white",
            gap: ".2rem",
            display: { md: "flex", xs: "none" },
            alignItems: "center",
          }}
        >
          <BookmarksIcon sx={{ fontSize: { xs: "1.3rem" } }} />
          <Badge
            badgeContent={number}
            color="secondary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography variant="h6">WatchList</Typography>
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: "white", display: { md: "none", xs: "initial" } }}
        >
          {" "}
          <Badge
            badgeContent={number}
            color="secondary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <SubscriptionsIcon />
          </Badge>
        </IconButton>
      </Link>
    </>
  );
}
