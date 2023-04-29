import { useState } from "react";
import axios from "axios";

import { Avatar } from "@mui/material";
import { ThumbUpRounded } from "@mui/icons-material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Header from "@header/Header"; // alias header
import PaginationComponent from "@pagination/Pagination"; // alias pagination
import { Ripples } from "@uiball/loaders";

import { getPageNumbers } from "./utils";
import { ImageDto } from "./dto";

const App = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [indexPage, setIndexPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getImagesFromUnsplashApi = async (
    e:
      | React.MouseEvent<HTMLHeadingElement, MouseEvent>
      | React.ChangeEvent<unknown>,
    page: number
  ) => {
    e.preventDefault();
    if (queryString != "") {
      const access_key = import.meta.env.VITE_ACCESS_KEY;
      setIsLoading(true);
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${queryString}&page=${page}&per_page=10&client_id=${access_key}`
      );
      const pageNumber = getPageNumbers(result.data.total);
      setNumberOfPages(pageNumber);
      setImages(result.data.results);
      setIsLoading(false);
    } else if (queryString == "") {
      setNumberOfPages(1);
      setImages([]);
    }
  };
  return (
    <div>
      <Header
        getImagesFromUnsplashApi={getImagesFromUnsplashApi}
        setQueryString={setQueryString}
        page={indexPage}
      ></Header>
      {isLoading ? (
        <div className="ripples" aria-live="polite" aria-busy={isLoading}>
          <Ripples speed={3} color="red" size={50} />
        </div>
      ) : (
        <div className="images">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 750: 2, 900: 3, 1250: 4 }}
          >
            <Masonry gutter="1vw">
              {images.map((image) => (
                <div key={image.id}>
                  <img
                    key={image.id}
                    src={image.urls.full}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: 15,
                      cursor: "pointer",
                    }}
                    alt=""
                    onClick={() => window.open(image.links.download, "_blank")}
                  />
                  <div className="author-description">
                    <Avatar
                      sx={{ height: "5vh", width: "5vh", cursor: "pointer" }}
                      src={image.user.profile_image?.large}
                      onClick={() =>
                        window.open(image.user.links.html, "_blank")
                      }
                    />
                    {image.user.username ? (
                      <h5
                        className="image-description"
                        onClick={() =>
                          window.open(image.user.links.html, "_blank")
                        }
                      >
                        {image.user.username.length > 8
                          ? image.user.username.slice(0, 4) + "..."
                          : image.user.username}
                      </h5>
                    ) : (
                      <h5 className="image-description">Anonymous</h5>
                    )}
                    <h5 className="image-description">
                      {image.likes.toString()}
                    </h5>
                    <ThumbUpRounded
                      sx={{
                        marginLeft: "0.1vw",
                      }}
                    ></ThumbUpRounded>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}

      <PaginationComponent
        setPage={setIndexPage}
        getImagesFromUnsplashApi={getImagesFromUnsplashApi}
        numberOfPages={numberOfPages}
        page={indexPage}
      ></PaginationComponent>
    </div>
  );
};
export default App;
