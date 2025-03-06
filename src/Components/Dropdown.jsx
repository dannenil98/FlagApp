import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ darkMode, region, handleRegionChange }) => {
  return (
    <FormControl
      variant="outlined"
      sx={{
        width: "178px",
        height: "56px",
        backgroundColor: darkMode ? "#202C36" : "#FFFFFF",
        "& .MuiOutlinedInput-root": {
          color: darkMode ? "#F2F2F2" : "#111517",
          backgroundColor: darkMode ? "#202C36" : "#FFFFFF",
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
      }}
    >
      <InputLabel
        sx={{
          color: darkMode ? "#A8A8A8" : "#5A5A5A",
          backgroundColor: darkMode ? "#202C36" : "#FFFFFF",
          px: 1,
          "&.Mui-focused": {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        }}
      >
        Region
      </InputLabel>
      <Select
        value={region}
        onChange={handleRegionChange}
        sx={{
          height: "56px",
          width: "100%",
          color: darkMode ? "#F2F2F2" : "#111517",
          backgroundColor: darkMode ? "#202C36" : "#FFFFFF",
          "& .MuiSelect-icon": {
            color: darkMode ? "#F2F2F2" : "inherit",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: darkMode ? "rgb(66, 82, 92)" : "#FFFFFF",
            },
          },
        }}
      >
        {["All", "Africa", "America", "Asia", "Europe", "Oceania"].map(
          (region) => (
            <MenuItem
              key={region.toLowerCase()}
              value={region.toLowerCase()}
              sx={{
                color: darkMode ? "#FFFFFF" : "#111517",
              }}
            >
              {region}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
