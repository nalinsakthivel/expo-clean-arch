import { PostDetailParams } from "@/presentation/navigation/types";
import { PostDetailScreen } from "@/presentation/screens/postdetail";
import { useLocalSearchParams } from "expo-router";

export default function PostRoute() {
  const { id } = (useLocalSearchParams() as unknown) as PostDetailParams;
  return <PostDetailScreen postId={id!} />;
}
