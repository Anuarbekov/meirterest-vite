import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Welcome from "./components/Welcome";
import MainLayout from "./components/MainLayout";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#e60023",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
          },
        },
        typography: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          button: { textTransform: "none", fontWeight: 700 },
        },
        shape: {
          borderRadius: 16,
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showWelcome ? (
        <Welcome onStart={() => setShowWelcome(false)} />
      ) : (
        <MainLayout />
      )}
    </ThemeProvider>
  );
};

export default App;
