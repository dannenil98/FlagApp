import {
  Typography,
  Button,
  Container,
  Paper,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";
import TechoverLogo from "../images/techover-logo.png";
import TechoverLogoDark from "../images/techover-logo-dark.png";
import MoonBordered from "../images/moon-bordered.svg";

const NavBar = ({ darkMode, setDarkMode }) => {
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const commonStyles = {
    color: darkMode ? "#ffffff" : "#000000",
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: darkMode ? "#2B3844" : "#ffffff",
        boxShadow: "none",
      }}
    >
      <Paper
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
          backgroundColor: darkMode ? "rgb(66, 82, 92)" : "#ffffff",
          display: "flex",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                ...commonStyles,
              }}
            >
              The Flag App
            </Typography>

            <Box
              component="img"
              src={darkMode ? TechoverLogo : TechoverLogoDark}
              alt="Techover Logo"
              sx={{
                width: "185px",
                height: "25px",
                display: { xs: "none", md: "block" },
              }}
            />

            <Button
              variant="text"
              onClick={handleThemeToggle}
              sx={{
                fontWeight: "400",
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                fontSize: "14px",
                ...commonStyles,
              }}
            >
              <Box
                component="img"
                src={MoonBordered}
                alt="Theme toggle"
                sx={{
                  marginRight: "8px",
                  width: "20px",
                  height: "20px",
                }}
              />
              {darkMode ? "DARK MODE" : "LIGHT MODE"}
            </Button>
          </Toolbar>
        </Container>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
