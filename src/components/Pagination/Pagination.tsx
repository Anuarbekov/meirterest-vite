import { Pagination } from "@mui/material";

import { PaginationPropsDto } from "./dto";

const PaginationComponent: React.FC<PaginationPropsDto> = ({
  setPage,
  getImagesFromUnsplashApi,
  page,
  numberOfPages,
}) => {
  return (
    <div className="footer">
      {numberOfPages > 1 ? (
        <Pagination
          page={page}
          count={numberOfPages}
          onChange={(e: React.ChangeEvent<unknown>, value: number) => {
            e.preventDefault();
            setPage(value);
            getImagesFromUnsplashApi(e, value);
          }}
          shape="circular"
          siblingCount={0}
        />
      ) : null}
    </div>
  );
};
export default PaginationComponent;
