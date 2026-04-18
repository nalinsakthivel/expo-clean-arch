import { getErrorMessage } from "@/core/errors/AppError";
import { Post } from "@/domain/entities/Post";
import { useGetPosts } from "@/domain/usecases/useGetPosts";
import { useMutatePost } from "@/domain/usecases/useMutatePost";
import { useCallback, useState } from "react";

export const usePostCrudScreen = () => {
  const {
    posts,
    isLoading: loading,
    isFetching: refreshing,
    error: queryError,
    refetch: refresh,
  } = useGetPosts();

  const {
    createPost,
    updatePost,
    deletePost,
    isCreating,
    isUpdating,
  } = useMutatePost();

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isSubmitting = isCreating || isUpdating;

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
        await updatePost({ id: editingPostId, title, body } as Post);
      } else {
        await createPost(title, body, "1");
      }
      clearForm();
    } catch (submitError) {
      setFormError(getErrorMessage(submitError));
    }
  }, [body, clearForm, createPost, editingPostId, title, updatePost]);

  const onEditPost = useCallback((post: Post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setFormError(null);
  }, []);

  const onDeletePost = useCallback(
    async (postId: string) => {
      try {
        setDeletingPostId(postId);
        await deletePost(postId);
      } catch (deleteError) {
        setFormError(getErrorMessage(deleteError));
      } finally {
        setDeletingPostId(null);
      }
    },
    [deletePost]
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
