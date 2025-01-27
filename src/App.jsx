import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import HomePage from "./Components/HomePage";
import NavBar from "./Components/Navbar";
import "./App.css";

// Skapa och definiera temat
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000DE", // Primary färg
    },
    secondary: {
      main: "#00000099", // Secondary färg
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif", // Global font-family
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <HomePage/>
    </ThemeProvider>
  );
};

export default App;
