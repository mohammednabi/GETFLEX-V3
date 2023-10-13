import React from 'react'

import TrailerBox from "../components/movies/TrailerBox"
import SmallMoviesSection from "../components/other/SmallMoviesSection"


export default function Home() {
  return (
    <>
   

      <TrailerBox />

      <SmallMoviesSection caption="recomended" />
      <SmallMoviesSection caption="up coming" />
      <SmallMoviesSection caption="fan choices" />
    </>
  );
}
