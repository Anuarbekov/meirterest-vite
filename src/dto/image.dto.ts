export interface ImageDto {
  id: string;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  user: {
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
  };
  links: {
    self: string;
    download: string;
  };
  likes: number;
  alt_description?: string;
}

export interface HeaderPropsDto {
  onSearch: (query: string) => void;
}

export interface PaginationPropsDto {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
