import { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import Search from "./Search";
import Dropdown from "./Dropdown";
import CountryCard from "./CountryCard";

const HomePage = ({ darkMode }) => {
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const commonCardStyles = {
    width: "100%",
    maxWidth: "345px",
    height: "100%",
    transition: "0.3s",
    cursor: "pointer",
  };

  const commonBoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  };

  const commonTypographyStyles = {
    flexShrink: 0,
    color: darkMode ? "#F2F2F2" : "text.secondary",
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    if (selectedRegion === "all") {
      filterCountries(search, "");
    } else {
      filterCountries(search, selectedRegion);
    }
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    filterCountries(searchText, region);
  };

  const filterCountries = (searchText, selectedRegion) => {
    let filtered = countries.filter((country) => {
      const matchesRegion =
        !selectedRegion ||
        selectedRegion === "all" ||
        country.region.toLowerCase() ===
          (selectedRegion === "america"
            ? "americas"
            : selectedRegion
          ).toLowerCase();
      const matchesSearch =
        !searchText ||
        country.name.common.toLowerCase().includes(searchText.toLowerCase());
      return matchesRegion && matchesSearch;
    });
    setFilteredCountries(filtered);
  };

  const InfoBox = ({ label, value }) => (
    <Box
      sx={{ ...commonBoxStyles, marginTop: label !== "Population" ? "8px" : 0 }}
    >
      <Typography variant="body2" sx={commonTypographyStyles}>
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );

  return (
    <Container
      sx={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        maxWidth: "1000px",
        paddingTop: "32px",
        backgroundColor: darkMode ? "#202C36" : "#ffffff",
      }}
    >
      <Box sx={{ marginBottom: "32px" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Search
              darkMode={darkMode}
              search={search}
              handleSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid item>
            <Dropdown
              darkMode={darkMode}
              region={region}
              handleRegionChange={handleRegionChange}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CountryCard loading={true} darkMode={darkMode} />
              </Grid>
            ))
          : filteredCountries.map((country) => (
              <Grid
                key={country.cca3}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CountryCard
                  country={country}
                  darkMode={darkMode}
                  loading={false}
                />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
