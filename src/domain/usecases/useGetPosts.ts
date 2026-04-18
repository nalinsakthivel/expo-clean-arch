import { useGetPostsQuery } from "@/data/api/postsApi";
import { Post } from "../entities/Post";

export interface UseGetPostsResult {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  isFetching: boolean;
}

export const useGetPosts = (): UseGetPostsResult => {
  const { data, isLoading, error, refetch, isFetching } = useGetPostsQuery();

  return {
    posts: data || [],
    isLoading,
    error: error ? "Failed to synchronize posts." : null,
    refetch,
    isFetching
  };
};
