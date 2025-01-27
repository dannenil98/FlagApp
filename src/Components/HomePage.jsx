import { useEffect, useState } from "react";
import {
  Skeleton,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const HomePage = () => {
  const [region, setRegion] = useState(""); // För dropdown
  const [search, setSearch] = useState(""); // För sökfält
  const [countries, setCountries] = useState([]); // Alla länder
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtrerade länder
  const [loading, setLoading] = useState(true); //skeleton loaders

  // Mappning av interna regionvärden till användarvänliga regionnamn
  const regionMap = {
    africa: "Africa",
    americas: "America",
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania",
  };

  // Hämta data från API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        // Sortera länderna i bokstavsordning baserat på namn
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries); // Sätt de sorterade länderna i state
        setFilteredCountries(sortedCountries);
        setLoading(false); // Visa de sorterade länderna från början
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Hantera ändring av region
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    // Om "All" är valt, visa alla länder
    if (selectedRegion === "all") {
      filterCountries(search, ""); // Filtrera utan region
    } else {
      filterCountries(search, selectedRegion); // Filtrera baserat på vald region
    }
  };

  // Hantera sökning
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    filterCountries(searchText, region);
  };

  // Filtrera länder baserat på sökning och region
  const filterCountries = (searchText, selectedRegion) => {
    let filtered = countries;

    // Filtrera på region om en är vald
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    // Filtrera på söktext om en finns
    if (searchText) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCountries(filtered); // Visa alla filtrerade länder
  };

  return (
    <Container
      sx={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        maxWidth: "1000px", // Max bredd för layouten
        paddingTop: "32px",
      }}
    >
      {/* Sökfält och Dropdown */}
      <Box sx={{ marginBottom: "32px" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Sökfält */}
          <Grid item>
            <TextField
              label="Search for a country"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              sx={{
                width: "373px", // Fast bredd
                height: "56px",
              }}
            />
          </Grid>

          {/* Dropdown */}
          <Grid item>
            <FormControl
              sx={{
                width: "178px", // Fast bredd
                height: "56px",
              }}
            >
              <InputLabel
                id="region-label"
                sx={{
                  backgroundColor: "white", // Fix för att etiketten inte ska täckas
                  paddingX: "4px",
                }}
              >
                Regions
              </InputLabel>
              <Select
                labelId="region-label"
                value={region}
                onChange={handleRegionChange}
                variant="outlined"
                fullWidth
                sx={{ height: "56px" }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="africa">Africa</MenuItem>
                <MenuItem value="americas">America</MenuItem>
                <MenuItem value="asia">Asia</MenuItem>
                <MenuItem value="europe">Europe</MenuItem>
                <MenuItem value="oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Länderna visas här */}
      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
  {/* Om data inte har laddats ännu, visa skeleton loaders */}
  {loading
    ? Array.from({ length: 12 }).map((_, index) => ( // Generera 12 skeletons
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              width: "100%", // Gör kortet fullt brett inom sin cell
              maxWidth: "345px", // Maxbredd på varje kort
              height: "100%", // Höjd på kortet
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px", // Box-shadow här
              "&:hover": {
                transform: "scale(1.05)", // Öka storleken med 5% vid hover
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 8px 16px -4px, rgba(0, 0, 0, 0.25) 0px 12px 20px 0px", // Skugga vid hover
              },
              cursor: "pointer", // Gör korten klickbara
            }}
          >
            {/* Skeleton för bild */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={140} // Höjd på bildskelett
              animation="wave"
            />
            {/* Innehåll */}
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Skeleton för landets namn */}
              <Skeleton width="60%" animation="wave" />
              <Box sx={{ marginTop: "8px" }}>
                {/* Skeleton för Population */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Population:</strong>
                  </Typography>
                  <Skeleton width="40%" animation="wave" sx={{ flexGrow: 1 }} />
                </Box>
                {/* Skeleton för Region */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "8px",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Region:</strong>
                  </Typography>
                  <Skeleton width="60%" animation="wave" sx={{ flexGrow: 1 }} />
                </Box>
                {/* Skeleton för Capital */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "8px",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Capital:</strong>
                  </Typography>
                  <Skeleton width="50%" animation="wave" sx={{ flexGrow: 1 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
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
          <Card
            sx={{
              width: "100%", // Gör kortet fullt brett inom sin cell
              maxWidth: "345px", // Maxbredd på varje kort
              height: "100%", // Höjd på kortet
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px", // Box-shadow här
              "&:hover": {
                transform: "scale(1.05)", // Öka storleken med 5% vid hover
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 8px 16px -4px, rgba(0, 0, 0, 0.25) 0px 12px 20px 0px", // Skugga vid hover
              },
              cursor: "pointer", // Gör korten klickbara
            }}
          >
            {/* Bild */}
            <CardMedia
              component="img"
              height="140"
              image={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              sx={{
                objectFit: "cover", // Håller bilden på plats och ser till att den täcker hela området utan att deformeras
                width: "100%", // Gör att bilden sträcker sig över hela bredden
              }}
            />
            {/* Innehåll */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {country.name.common}
              </Typography>
              <Box sx={{ marginTop: "8px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Population:</strong> {country.population.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "8px",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Region:</strong> {country.region}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "8px",
                    alignItems: "center", // För att hålla texten och skeleton på samma rad
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
</Grid>




    </Container>
  );
};

export default HomePage;
