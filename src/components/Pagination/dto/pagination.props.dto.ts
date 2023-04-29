export interface PaginationPropsDto {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  getImagesFromUnsplashApi: (
    e:
      | React.MouseEvent<HTMLHeadingElement, MouseEvent>
      | React.ChangeEvent<unknown>,
    page: number
  ) => Promise<void>;
  page: number;
  numberOfPages: number;
}
