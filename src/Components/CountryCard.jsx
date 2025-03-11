import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

const CountryCard = ({ country, darkMode, loading }) => {
  const commonCardStyles = {
    width: "100%",
    maxWidth: "345px",
    height: "100%",
    transition: "0.3s",
    cursor: "pointer",
    backgroundColor: darkMode ? "rgb(66, 82, 92)" : "#FFFFFF",
    boxShadow: darkMode
      ? "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"
      : "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",

    "&:hover": {
      filter: darkMode ? "brightness(1.2)" : "brightness(0.95)",
    },
  };

  const InfoBox = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginTop: label !== "Population" ? "8px" : 0,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          flexShrink: 0,
          color: darkMode ? "#F2F2F2" : "text.secondary",
        }}
      >
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );

  if (loading) {
    return (
      <Card sx={commonCardStyles}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={140}
          animation="wave"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton width="60%" animation="wave" />
          <Box sx={{ marginTop: "8px" }}>
            {["Population", "Region", "Capital"].map((label) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: label !== "Population" ? "8px" : 0,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flexShrink: 0,
                    color: darkMode ? "#F2F2F2" : "text.secondary",
                  }}
                >
                  <strong>{label}:</strong>
                </Typography>
                <Skeleton
                  width={
                    label === "Population"
                      ? "40%"
                      : label === "Region"
                      ? "60%"
                      : "50%"
                  }
                  animation="wave"
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      to={`/country/${country.cca3}`}
      style={{
        textDecoration: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={commonCardStyles}>
        <CardMedia
          component="img"
          height="140"
          image={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          sx={{
            objectFit: "cover",
            width: "100%",
            zIndex: 0, // Bilden ska vara under overlay
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            zIndex: 2, // Textinnehållet ska vara över overlay
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: darkMode ? "#ffffff" : "inherit",
            }}
          >
            {country.name.common}
          </Typography>
          <Box sx={{ marginTop: "8px" }}>
            <InfoBox
              label="Population"
              value={country.population.toLocaleString()}
            />
            <InfoBox label="Region" value={country.region} />
            <InfoBox
              label="Capital"
              value={country.capital ? country.capital[0] : "N/A"}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;