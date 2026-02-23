import { container } from "@/core/di/container";
import { getErrorMessage } from "@/core/errors/AppError";
import { Post } from "@/domain/entities/Post";
import { CreatePostUseCase } from "@/domain/usecases/CreatePostUseCase";
import { DeletePostUseCase } from "@/domain/usecases/DeletePostUseCase";
import { GetPostsUseCase } from "@/domain/usecases/GetPostsUseCase";
import { UpdatePostUseCase } from "@/domain/usecases/UpdatePostUseCase";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";

const POSTS_QUERY_KEY = ["posts"] as const;

interface CreatePostForm {
  title: string;
  body: string;
}

interface UpdatePostForm {
  id: string;
  title: string;
  body: string;
}

export const usePostsViewModel = () => {
  const queryClient = useQueryClient();
  const getPostsUseCase = useMemo(() => container.resolve(GetPostsUseCase), []);
  const createPostUseCase = useMemo(
    () => container.resolve(CreatePostUseCase),
    [],
  );
  const updatePostUseCase = useMemo(
    () => container.resolve(UpdatePostUseCase),
    [],
  );
  const deletePostUseCase = useMemo(
    () => container.resolve(DeletePostUseCase),
    [],
  );

  const {
    data: posts = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => getPostsUseCase.execute(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreatePostForm) =>
      createPostUseCase.execute({ userId: "1", ...payload }),
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (previous = []) => [
        newPost,
        ...previous,
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdatePostForm) => updatePostUseCase.execute(payload),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (previous = []) =>
        previous.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => deletePostUseCase.execute(postId),
    onSuccess: (_, postId) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (previous = []) =>
        previous.filter((post) => post.id !== postId),
      );
    },
  });

  return {
    posts,
    loading: isLoading,
    refreshing: isRefetching,
    error: error ? getErrorMessage(error) : null,
    createPost: createMutation.mutateAsync,
    updatePost: updateMutation.mutateAsync,
    deletePost: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deletingPostId: deleteMutation.isPending
      ? (deleteMutation.variables ?? null)
      : null,
    refresh: refetch,
  };
};
