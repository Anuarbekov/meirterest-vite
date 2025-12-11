import { useState, useCallback } from "react";
import axios from "axios";
import { ImageDto } from "../dto";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const API_URL = "https://api.unsplash.com/search/photos";

export const useImageSearch = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");

  const searchImages = useCallback(async (query: string) => {
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setPage(1);
    setCurrentQuery(query);

    try {
      const { data } = await axios.get(API_URL, {
        params: { query, page: 1, per_page: 20, client_id: ACCESS_KEY },
      });

      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || page >= totalPages || !currentQuery) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const { data } = await axios.get(API_URL, {
        params: {
          query: currentQuery,
          page: nextPage,
          per_page: 20,
          client_id: ACCESS_KEY,
        },
      });

      setImages((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more images.");
    } finally {
      setIsLoading(false);
    }
  }, [page, totalPages, currentQuery, isLoading]);

  return {
    images,
    isLoading,
    error,
    hasMore: page < totalPages,
    searchImages,
    loadMore,
  };
};
