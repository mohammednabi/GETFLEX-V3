import React, { useContext, useEffect, useMemo, useState } from "react";
import TopMovie from "../components/cards/TopMovie";
import { Container, Divider, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { SeriesContext } from "../contexts/SeriesContext";

export default function Top100Series() {
  const topSeries = useContext(SeriesContext);

  const sortedSeries = useMemo(() => {
    return topSeries.sort((a, b) => {
      return a.rank - b.rank;
    });
  }, [topSeries]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "calc(100vh - 83px - 221px + 1rem)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "white", textAlign: "center", margin: "1rem 0" }}
        >
          Top 100 Series
        </Typography>
        {topSeries.length > 0 ? (
          sortedSeries.map((top) => (
            <React.Fragment key={uuidv4()}>
              <TopMovie movie={top} type="serie" />
              <Divider sx={{ background: "rgba(255,255,255,.5)" }} />
            </React.Fragment>
          ))
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: "25rem" }}
          />
        )}
      </Container>
    </>
  );
}
