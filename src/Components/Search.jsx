import { TextField } from "@mui/material";

const Search = ({ darkMode, search, handleSearchChange }) => {
  return (
    <TextField
      label="Search for a country"
      variant="outlined"
      value={search}
      onChange={handleSearchChange}
      sx={{
        width: "373px",
        height: "56px",
        "& .MuiOutlinedInput-root": {
          color: darkMode ? "#F2F2F2" : "#111517",
          "& fieldset": {
            borderColor: darkMode ? "#404C59" : "#E0E0E0",
          },
          "&:hover fieldset": {
            borderColor: darkMode ? "#F2F2F2" : "#2B3844",
          },
          "&.Mui-focused fieldset": {
            borderColor: darkMode ? "#F2F2F2" : "#2B3844",
          },
        },
        "& .MuiInputLabel-root": {
          color: darkMode ? "#A8A8A8" : "#5A5A5A",
          backgroundColor: darkMode ? "#202C36" : "#FFFFFF",
          px: 1,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: darkMode ? "#FFFFFF" : "#000000",
        },
      }}
    />
  );
};

export default Search;
