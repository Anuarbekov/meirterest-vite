import { useState, useEffect } from "react";
import { Fab, Zoom, useTheme } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Zoom in={isVisible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          bgcolor: theme.palette.primary.main,
          color: "white",
          "&:hover": {
            bgcolor: theme.palette.primary.dark,
          },
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
