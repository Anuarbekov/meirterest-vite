import { Avatar } from "@mui/material";

import { HeaderPropsDto } from "./dto";

const Header: React.FC<HeaderPropsDto> = ({
  getImagesFromUnsplashApi,
  setQueryString,
  page,
}) => {
  return (
    <header className="header">
      <div className="logo">
        <Avatar
          sx={{
            bgcolor: "rgb(230 0 35)",
            height: "5vh",
            width: "5vh",
            marginLeft: "0.4em",
            cursor: "pointer",
          }}
          onClick={() => window.open("/", "_self")}
        >
          M
        </Avatar>
      </div>

      <form
        className="searchthis"
        style={{ display: "inline" }}
        onSubmit={(e) => getImagesFromUnsplashApi(e, page)}
      >
        <input
          className="search-box"
          type="text"
          placeholder=" Search..."
          onChange={(e) => setQueryString(e.target.value)}
        />
        <input className="search-btn" value="Search" type="submit" />
      </form>
    </header>
  );
};
export default Header;
