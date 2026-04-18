import { Post } from "@/domain/entities/Post";
import { makeStyles } from "@/presentation/theme/makeStyles";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { navigateTo } from "../navigation/RootNavigation";
import { ROUTES } from "../navigation/Routes";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
  isDeleting: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigateTo(ROUTES.POST_DETAIL(post.id))}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>

      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={(e) => {
            e.stopPropagation();
            onEdit(post);
          }}
        >
          <Text style={styles.editText}>{t("post.edit")}</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete(post.id);
          }}
          disabled={isDeleting}
        >
          <Text style={styles.deleteText}>
            {isDeleting ? t("post.deleting") : t("post.delete")}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    shadowColor: "#000",
    shadowOpacity: theme.isDark ? 0.3 : 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  editButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  },
  editText: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  deleteText: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
}));
