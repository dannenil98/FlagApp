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
    backgroundColor: darkMode ? "#2B3844" : "#FFFFFF",
    boxShadow: darkMode
      ? "none"
      : "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: darkMode
        ? "rgba(255, 255, 255, 0.25) 0px 8px 16px -4px"
        : "rgba(0, 0, 0, 0.3) 0px 8px 16px -4px",
      backgroundColor: darkMode ? "#2B3844" : "#f0f0f0",
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
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            backgroundColor: darkMode ? "rgb(66, 82, 92)" : "#FFFFFF",
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
