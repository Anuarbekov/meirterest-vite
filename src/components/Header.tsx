import { useState, FormEvent } from "react";
import { Avatar, InputBase, Paper, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const reloadPage = () => window.location.reload();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        p: 2,
        position: "relative",
        bgcolor: "background.default",
        transition: "background-color 0.3s ease",
        gap: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          left: { xs: "auto", md: 24 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#e60023",
            color: "#fff",
            width: 40,
            height: 40,
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={reloadPage}
        >
          L
        </Avatar>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "24px",
          boxShadow: "none",
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          flex: { xs: 1, md: "none" },
          width: { xs: "auto", md: "100%" },
          maxWidth: "600px",

          backgroundColor: "rgba(255, 255, 255, 0.15)",
          color: "text.primary",

          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            color: "inherit",
            fontSize: { xs: "0.9rem", md: "1rem" },
            "& input::placeholder": {
              color: "rgba(255,255,255,0.7)",
              opacity: 1,
            },
          }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search images" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", color: "inherit" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Header;
