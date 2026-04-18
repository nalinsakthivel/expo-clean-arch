import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/core/network/baseQuery";
import { Post } from "@/domain/entities/Post";
import { PostModel, PostDTO } from "@/data/models/PostModel";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQuery,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({ url: "/posts", params: { _limit: 20 } }),
      transformResponse: (response: PostDTO[]) => PostModel.fromJsonList(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id: String(id) })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation<Post, { title: string; body: string; userId: string }>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        data: PostModel.toCreateDto(body),
      }),
      transformResponse: (response: PostDTO) => PostModel.fromJson(response),
      // Invalidate the list so it refetches after creating a new post
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<Post, { id: string; title: string; body: string }>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        data: PostModel.toUpdateDto({ id, ...body }),
      }),
      transformResponse: (response: PostDTO) => PostModel.fromJson(response),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
