export interface ImageDto {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  user: {
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      large: string;
    };
  };
  links: {
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