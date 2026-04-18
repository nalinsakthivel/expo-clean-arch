import { useGetPosts } from "@/domain/usecases/useGetPosts";
import { back } from "@/presentation/navigation/RootNavigation";
import { makeStyles } from "@/presentation/theme/makeStyles";
import { useAppTheme } from "@/presentation/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PostDetailProps {
  postId: string;
}

export const PostDetailScreen: React.FC<PostDetailProps> = ({ postId }) => {
  const styles = useStyles();
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const { posts, isLoading } = useGetPosts();
  const post = posts?.find((p) => p.id === postId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={styles.header}>{t("detail.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>{t("detail.loading")}</Text>
          </View>
        ) : !post ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{t("detail.notFound")}</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.title}>{post.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.body}>{post.body}</Text>
            <Text style={styles.idLabel}>
              ID: {post.id} | User: {post.userId}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  header: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  container: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: "#000",
    shadowOpacity: theme.isDark ? 0.3 : 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  body: {
    ...theme.typography.body,
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xl,
  },
  idLabel: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    textAlign: "right",
  },
}));
