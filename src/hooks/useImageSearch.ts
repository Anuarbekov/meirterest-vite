import { useState, useCallback } from "react";
import axios from "axios";
import { ImageDto } from "../dto";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const API_URL_SEARCH = "https://api.unsplash.com/search/photos";
const API_URL_FEED = "https://api.unsplash.com/photos";

export const useImageSearch = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [mode, setMode] = useState<"feed" | "search">("feed");
  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");

  const fetchFromApi = async (endpoint: string, params: any) => {
    return axios.get(endpoint, {
      params: { ...params, client_id: ACCESS_KEY, per_page: 20 },
    });
  };

  const fetchEditorialFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMode("feed");
    setPage(1);
    setCurrentQuery("");

    try {
      const { data } = await fetchFromApi(API_URL_FEED, { page: 1, order_by: "popular" });
      setImages(data); // unsplash /photos returns an array directly, not data.results
    } catch (err) {
      console.error(err);
      setError("Failed to load feed.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchImages = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setMode("search");
    setPage(1);
    setCurrentQuery(query);

    try {
      const { data } = await fetchFromApi(API_URL_SEARCH, { query, page: 1 });
      setImages(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to search images.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      let newImages: ImageDto[] = [];

      if (mode === "search") {
        const { data } = await fetchFromApi(API_URL_SEARCH, { query: currentQuery, page: nextPage });
        newImages = data.results;
      } else {
        const { data } = await fetchFromApi(API_URL_FEED, { page: nextPage, order_by: "popular" });
        newImages = data;
      }

      setImages((prev) => [...prev, ...newImages]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more.");
    } finally {
      setIsLoading(false);
    }
  }, [page, mode, currentQuery, isLoading]);

  return { 
    images, 
    isLoading, 
    error, 
    hasMore: true,
    fetchEditorialFeed,
    searchImages, 
    loadMore 
  };
};