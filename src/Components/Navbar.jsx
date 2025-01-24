import React from "react";
import {
  Typography,
  Button,
  Container,
  Paper,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Logo from "../images/Logo.png";

const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
    >
      <Paper
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
          backgroundColor: "#ffffff",
          display: "flex",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Container
          sx={{
            width: "100%",
            marginLeft: "auto",
            boxSizing: "border-box",
            marginRight: "auto",
            display: "block",
          }}
        >
          <Toolbar
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              The Flag App
            </Typography>

            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                width: "185px",
                height: "45px",
              }}
            />

            <Button
              variant="text"
              color="primary"
              sx={{
                fontWeight: '400',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                fontSize: "14px",
              }}
            >
              <Brightness4Icon sx={{ marginRight: "8px", width: '20px', height: '20px', padding: '0px' }} />
              LIGHT MODE
            </Button>
          </Toolbar>
        </Container>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
