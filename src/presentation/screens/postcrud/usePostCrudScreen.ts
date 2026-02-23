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
import { useCallback, useMemo, useState } from "react";

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

export const usePostCrudScreen = () => {
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
    isLoading: loading,
    isRefetching: refreshing,
    error,
    refetch: refresh,
  } = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => getPostsUseCase.execute(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreatePostForm) =>
      createPostUseCase.execute({ userId: "1", ...payload }),
    onSuccess: (newPost) => {
      // Update list cache immediately to keep UI responsive.
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

  // Shared form state for create/edit mode.
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const deletingPostId = deleteMutation.isPending
    ? (deleteMutation.variables ?? null)
    : null;
  const queryError = error ? getErrorMessage(error) : null;

  const clearForm = useCallback(() => {
    setEditingPostId(null);
    setTitle("");
    setBody("");
    setFormError(null);
  }, []);

  const submit = useCallback(async () => {
    try {
      setFormError(null);
      if (editingPostId) {
        await updateMutation.mutateAsync({ id: editingPostId, title, body });
      } else {
        await createMutation.mutateAsync({ title, body });
      }
      clearForm();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Request failed";
      setFormError(message);
    }
  }, [body, clearForm, createMutation, editingPostId, title, updateMutation]);

  const onEditPost = useCallback((post: Post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setFormError(null);
  }, []);

  const onDeletePost = useCallback(
    async (postId: string) => {
      try {
        await deleteMutation.mutateAsync(postId);
      } catch (deleteError) {
        const message =
          deleteError instanceof Error ? deleteError.message : "Delete failed";
        setFormError(message);
      }
    },
    [deleteMutation],
  );

  return {
    posts,
    loading,
    refreshing,
    refresh,
    queryError,
    title,
    setTitle,
    body,
    setBody,
    formError,
    editingPostId,
    isSubmitting,
    deletingPostId,
    clearForm,
    submit,
    onEditPost,
    onDeletePost,
  };
};
