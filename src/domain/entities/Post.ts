export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export const isPostValid = (post: Post): boolean => {
  return post.title.trim().length > 0 && post.body.trim().length > 0;
};
