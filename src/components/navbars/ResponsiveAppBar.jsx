import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@emotion/react";
import SearchBox from "../other/SearchBox";
import NavbarMenu from "../menues/NavbarMenu";
import { Divider } from "@mui/material";
import WatchList from "../other/WatchList";

const pages = ["home", "categories", "watchlist"];



function ResponsiveAppBar()
{
    const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <>
      {/* <AppBar
        position="sticky"
        sx={{ backgroundColor: `${theme.pallete.primary.second}` }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Container
              maxWidth="xs"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            >
              <img
                src="/imgs/GITFLEX LOGO.png"
                style={{ width: "10rem" }}
                alt=""
              />
            </Container>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Container
              maxWidth="xs"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <img
                src="/imgs/GITFLEX LOGO.png"
                style={{ width: "10rem" }}
                alt=""
              />
            </Container>

            <SearchBox />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: `${theme.pallete.primary.forth}`,
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height:"100%",
            justifyContent: "flex-start",
            alignItems: "center",
            
            gap: "1rem",
          }}
        >
          <img src="/imgs/GITFLEX LOGO.png" style={{ width: "10rem" }} alt="" />
          <NavbarMenu />
          <SearchBox />
          <IconButton sx={{color:"white",fontFamily:"",fontSize:"1.2rem"}}>

            GETFLEX <span style={{ color: "#a5112c",fontSize:"1.5rem" }}>Mega</span>
          
          </IconButton>
          <Box sx={{height:"2rem",width:".1rem",backgroundColor:"white"}}></Box>
<WatchList />
        </Box>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
