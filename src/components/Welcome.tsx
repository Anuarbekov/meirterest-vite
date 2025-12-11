import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Explore, Favorite } from "@mui/icons-material";

const IMAGE_COLUMNS = [
  [
    "1765276999390-d77d822b3c4b",
    "1761839258671-6495fdc188b3",
    "1765307639918-a99f7f3d9f75",
    "1765285947952-a3c79761a9b0",
  ],
  [
    "1761839258623-e232e15f7ff3",
    "1765451817006-4a9f9cb3afc4",
    "1698846880859-8a9628ebae55",
    "1761839257946-4616bcfafec7",
  ],
  [
    "1760908626887-044b68850dbf",
    "1765202665764-ca839162fe4a",
    "1761839257144-297ce252742e",
    "1765274456799-b8c40449706b",
  ],
];

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          display: "flex",
          gap: 2,
          transform: "rotate(-5deg)",
          opacity: 0.3,
          filter: "grayscale(20%)",
          zIndex: 0,
        }}
      >
        {IMAGE_COLUMNS.map((column, colIndex) => (
          <Box
            key={colIndex}
            sx={{
              flex: 1,
              flexDirection: "column",
              gap: 2,
              animation: `marquee ${20 + colIndex * 10}s linear infinite`,
              display: isMobile && colIndex !== 1 ? "none" : "flex",
            }}
          >
            {[...column, ...column, ...column].map((id, imgIndex) => (
              <Box
                key={`${colIndex}-${imgIndex}`}
                component="img"
                src={`https://images.unsplash.com/photo-${id}?w=400&q=80`}
                alt="background"
                sx={{ width: "100%", borderRadius: 4, objectFit: "cover" }}
              />
            ))}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(18,18,18,1) 100%)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          zIndex: 2,
          textAlign: "center",
          maxWidth: "700px",
          width: "90%",
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(30, 30, 30, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.5rem", md: "4rem" },
            mb: 2,
            background: "linear-gradient(135deg, #e60023 0%, #ff8f00 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05em",
          }}
        >
          Lumina.
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, color: "#fff", opacity: 0.9 }}>
          Where inspiration begins.
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 5, color: "#ccc", fontSize: "1.1rem", lineHeight: 1.6 }}
        >
          Discover recipes, home ideas, style inspiration, and other ideas to
          try.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onStart}
          endIcon={<Explore />}
          sx={{
            bgcolor: "#e60023",
            color: "#fff",
            borderRadius: "50px",
            px: 6,
            py: 1.8,
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(230, 0, 35, 0.4)",
            "&:hover": {
              boxShadow: "0 10px 25px rgba(230, 0, 35, 0.4)",
            },
          }}
        >
          Start Exploring
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 2,
          opacity: 0.6,
          color: "rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          transition: "opacity 0.3s",
          "&:hover": { opacity: 1 },
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}
        >
          made with
        </Typography>
        <Favorite sx={{ fontSize: 14, color: "#e60023" }} />
        <Typography
          variant="caption"
          sx={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}
        >
          by Meir
        </Typography>
      </Box>
      <style>
        {`@keyframes marquee { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }`}
      </style>
    </Box>
  );
};

export default Welcome;
