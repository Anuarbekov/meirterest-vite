import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { ThumbUpRounded } from "@mui/icons-material";
import { ImageDto } from "../dto";

interface ImageCardProps {
  image: ImageDto;
}

const ImageCard = React.memo(({ image }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const openLink = (url: string) => window.open(url, "_blank");

  const displayUsername =
    image.user.username && image.user.username.length > 10
      ? `${image.user.username.slice(0, 10)}...`
      : image.user.username || "Anonymous";

  return (
    <div className="image-card-container">
      <div
        style={{
          backgroundColor: image.color || "#eee",
          borderRadius: 15,
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => openLink(image.links.download)}
      >
        <img
          src={image.urls.small}
          srcSet={`${image.urls.small} 1x, ${image.urls.regular} 2x`}
          alt={image.alt_description || "Lumina image"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 15,

            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      </div>

      <div className="author-description">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mt: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            openLink(image.user.links.html);
          }}
        >
          <Avatar
            sx={{ height: 32, width: 32, mr: 1, bgcolor: image.color }}
            src={image.user.profile_image?.medium}
          />
          <Typography variant="subtitle1" fontWeight="600" noWrap>
            {displayUsername}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "auto",
            opacity: 0.7,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {image.likes}
          </Typography>
          <ThumbUpRounded sx={{ ml: 0.5, fontSize: 18 }} />
        </Box>
      </div>
    </div>
  );
});

export default ImageCard;
