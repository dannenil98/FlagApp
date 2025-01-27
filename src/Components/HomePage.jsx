import { Container, TextField, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState } from "react";

const HomePage = () => {
  const [region, setRegion] = useState(""); // Tomt värde som standard

  const handleRegionChange = (event) => {
    setRegion(event.target.value); // Uppdatera region när användaren ändrar val
  };

  return (
    <Container
      sx={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        maxWidth: "600px", // Max bredd för layouten (kan justeras)
      }}
    >
      <Box sx={{ paddingTop: "32px" }}>
        {/* Övergripande Grid-container för horisontell layout */}
        <Grid2
          container
          alignItems="center" // Centrera elementen vertikalt
          justifyContent="space-between" // Placera elementen på varsin sida
          sx={{
            gap: 2, // Mellanrum mellan fält
          }}
        >
          {/* Grid för sökfältet */}
          <Grid2 item>
            <TextField
              label="Search for a country"
              variant="outlined"
              sx={{
                width: "373px", // Fast bredd
                height: "56px", // Fast höjd
              }}
            />
          </Grid2>

          {/* Grid för dropdown */}
          <Grid2 item>
            <FormControl
              sx={{
                width: "178px", // Fast bredd
                height: "56px", // Fast höjd
              }}
            >
              <InputLabel
                id="region-label"
                sx={{
                  backgroundColor: "white", // Fixar så att etiketten inte går bakom ramen
                  paddingX: "4px", // Lägger lite padding för bättre visuellt resultat
                  marginLeft: "-4px", // Justera så att den matchar inre position
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
                sx={{
                  height: "56px", // Ytterhöjd
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Begränsa maxhöjd på dropdown
                    },
                  },
                }}
              >
                {/* Menyval */}
                <MenuItem value="" disabled>
                  Select a region
                </MenuItem>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="africa">Africa</MenuItem>
                <MenuItem value="america">America</MenuItem>
                <MenuItem value="asia">Asia</MenuItem>
                <MenuItem value="europe">Europe</MenuItem>
                <MenuItem value="oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default HomePage;
