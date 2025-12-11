import { useState, useRef, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Ripples } from "@uiball/loaders";
import { Box, Typography, Button } from "@mui/material";
import { SearchOff, ArrowUpward } from "@mui/icons-material";

import Header from "./Header";
import ImageCard from "./ImageCard";
import { useImageSearch } from "../hooks/useImageSearch";

const MainLayout = () => {
  const [hasSearched, setHasSearched] = useState(false);

  const { images, isLoading, error, hasMore, searchImages, loadMore } =
    useImageSearch();

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore]
  );
  const handleSearch = (newQuery: string) => {
    setHasSearched(true);
    searchImages(newQuery);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderNoResults = () => (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        opacity: 0.7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchOff sx={{ fontSize: 60, mb: 2, color: "text.secondary" }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        No matches found.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We couldn't find anything for that query.
      </Typography>
    </Box>
  );

  const renderEmptyState = () => (
    <Box sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
      <Typography variant="h4" fontWeight="bold" color="text.secondary">
        Ready to explore?
      </Typography>
      <Typography variant="body1">
        Type something in the search bar above.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      <Header onSearch={handleSearch} />

      {error && (
        <div
          className="error-message"
          style={{ textAlign: "center", color: "#ff5252", margin: "20px" }}
        >
          {error}
        </div>
      )}

      <Box sx={{ px: { xs: 2, md: 3 } }}>
        {!hasSearched && renderEmptyState()}
        {hasSearched && !isLoading && images.length === 0 && renderNoResults()}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="16px">
            {images.map((image, index) => {
              if (images.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={image.id}>
                    <ImageCard image={image} />
                  </div>
                );
              }
              return <ImageCard key={image.id} image={image} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </Box>

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 4,
            width: "100%",
          }}
        >
          <Ripples speed={3} color="#e60023" size={50} />
        </Box>
      )}

      {!hasMore && images.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 5, mb: 5, opacity: 0.6 }}>
          <Typography variant="body2" gutterBottom>
            You've seen it all!
          </Typography>
          <Button
            startIcon={<ArrowUpward />}
            onClick={scrollToTop}
            sx={{ color: "text.primary" }}
          >
            Back to Top
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainLayout;
