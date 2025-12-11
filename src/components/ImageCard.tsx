import { Avatar } from "@mui/material";
import { ThumbUpRounded } from "@mui/icons-material";
import { ImageDto } from "../dto";

interface ImageCardProps {
  image: ImageDto;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const openLink = (url: string) => window.open(url, "_blank");

  const displayUsername =
    image.user.username && image.user.username.length > 8
      ? `${image.user.username.slice(0, 8)}...`
      : image.user.username || "Anonymous";

  return (
    <div className="image-card-container">
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Unsplash image"}
        className="masonry-image"
        style={{
          width: "100%",
          display: "block",
          borderRadius: 15,
          cursor: "pointer",
        }}
        onClick={() => openLink(image.links.download)}
      />

      <div className="author-description">
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => openLink(image.user.links.html)}
        >
          <Avatar
            sx={{ height: 32, width: 32, marginRight: 1 }}
            src={image.user.profile_image?.large}
          />
          <h5 className="image-description">{displayUsername}</h5>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <h5 className="image-description">{image.likes}</h5>
          <ThumbUpRounded sx={{ marginLeft: 0.5, fontSize: 18 }} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
