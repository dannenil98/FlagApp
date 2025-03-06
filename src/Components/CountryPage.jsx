import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CardMedia,
  Box,
  Grid,
  Button,
  Stack,
  Chip,
  Skeleton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CountryPage = ({ darkMode }) => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const commonTextStyles = {
    color: darkMode ? "#ffffff" : "inherit",
  };

  const commonSkeletonStyles = {
    animation: "wave",
  };

  const InfoText = ({ label, value }) => (
    <Typography variant="body1" sx={commonTextStyles}>
      <strong>{label}:</strong> {value}
    </Typography>
  );

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const BackButton = () => (
    <Button
      startIcon={<ArrowBackIcon sx={commonTextStyles} />}
      onClick={() => navigate("/")}
      sx={{
        mb: 3,
        ...commonTextStyles,
      }}
    >
      Back
    </Button>
  );

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <BackButton />
        <Grid container spacing={6} sx={{ py: 8 }}>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: "8px", ...commonSkeletonStyles }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Skeleton
                variant="text"
                width="60%"
                height={60}
                sx={{ pl: 2, ...commonSkeletonStyles }}
              />

              <Grid container spacing={2}>
                {[6, 6].map((size, gridIndex) => (
                  <Grid item xs={12} md={size} key={gridIndex}>
                    <Stack spacing={2}>
                      {[...Array(gridIndex === 0 ? 4 : 3)].map((_, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Skeleton
                            width="40%"
                            height={24}
                            sx={commonSkeletonStyles}
                          />
                          <Skeleton
                            width="50%"
                            height={24}
                            sx={{ ml: 1, ...commonSkeletonStyles }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 8, pl: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton width={140} height={24} sx={commonSkeletonStyles} />
                  <Stack direction="row" spacing={1}>
                    {[...Array(3)].map((_, index) => (
                      <Skeleton
                        key={index}
                        width={60}
                        height={32}
                        variant="rectangular"
                        sx={{ borderRadius: 1, ...commonSkeletonStyles }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!country) {
    return <Typography>Country not found.</Typography>;
  }

  const flagStyles = {
    width: "100%",
    height: "auto",
    maxHeight: 400,
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  };

  const borderChipStyles = {
    backgroundColor: darkMode ? "#404C59" : "#f0f0f0",
    color: darkMode ? "#ffffff" : "#111517",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: darkMode ? "#374151" : "#e0e0e0",
      color: darkMode ? "#ffffff" : "#111517",
    },
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <BackButton />

        <Grid container spacing={6} sx={{ py: 8 }}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              sx={flagStyles}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ pl: 2, ...commonTextStyles }}
              >
                {country.name.common}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InfoText
                      label="Population"
                      value={country.population.toLocaleString()}
                    />
                    <InfoText label="Region" value={country.region} />
                    <InfoText
                      label="Capital"
                      value={country.capital?.[0] ?? "N/A"}
                    />
                    <InfoText
                      label="Native Name"
                      value={
                        country.name.nativeName
                          ? country.name.nativeName[
                              Object.keys(country.name.nativeName)[0]
                            ].common
                          : country.name.common
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InfoText
                      label="Top Level Domain"
                      value={country.tld?.[0] ?? "N/A"}
                    />
                    <InfoText
                      label="Currencies"
                      value={
                        country.currencies
                          ? Object.values(country.currencies)
                              .map((curr) => curr.name)
                              .join(", ")
                          : "N/A"
                      }
                    />
                    <InfoText
                      label="Languages"
                      value={
                        country.languages
                          ? Object.values(country.languages).join(", ")
                          : "N/A"
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>

              {country.borders && (
                <Box sx={{ mt: 8, pl: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body1" sx={commonTextStyles}>
                      <strong>Border Countries:</strong>
                    </Typography>
                    <Box
                      sx={{
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { height: "8px" },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: darkMode ? "#202C36" : "#f1f1f1",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: darkMode ? "#ffffff" : "#888",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: darkMode ? "#cccccc" : "#555",
                          },
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ py: 1, minWidth: "max-content" }}
                      >
                        {country.borders.map((border) => (
                          <Chip
                            key={border}
                            label={border}
                            component={Link}
                            to={`/country/${border}`}
                            clickable
                            size="small"
                            sx={borderChipStyles}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CountryPage;
