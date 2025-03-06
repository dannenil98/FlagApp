import React, { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Components/HomePage";
import CountryPage from "./Components/CountryPage"; 
import NavBar from "./Components/Navbar";
import "./App.css";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif", 
    },
  },
});

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ 
        backgroundColor: darkMode ? '#202C36' : '#fff',
        minHeight: '100vh'
      }}>
        <Router>
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/country/:countryCode" element={<CountryPage darkMode={darkMode} />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;