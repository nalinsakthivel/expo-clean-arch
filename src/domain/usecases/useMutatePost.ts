import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/data/api/postsApi";
import { Post } from "../entities/Post";

export const useMutatePost = () => {
  const [createPostFn, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePostFn, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePostFn, { isLoading: isDeleting }] = useDeletePostMutation();

  const createPost = async (title: string, body: string, userId: string): Promise<Post> => {
    return await createPostFn({ title, body, userId }).unwrap();
  };

  const updatePost = async (post: Post): Promise<Post> => {
    return await updatePostFn(post).unwrap();
  };

  const deletePost = async (id: string): Promise<void> => {
    await deletePostFn(id).unwrap();
  };

  return {
    createPost,
    updatePost,
    deletePost,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
