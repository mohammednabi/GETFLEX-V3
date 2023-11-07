import React from "react";
import ResponsiveAppBar from "../components/navbars/ResponsiveAppBar";
import { Outlet } from "react-router-dom";
import MainFotter from "../components/footers/MainFotter";

export default function MainLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <MainFotter />
    </>
  );
}
