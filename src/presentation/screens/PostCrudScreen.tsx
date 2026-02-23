import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostCard } from "../components/PostCard";
import { theme } from "../theme/theme";
import { usePostsViewModel } from "../viewmodels/usePostsViewModel";

export const PostCrudScreen: React.FC = () => {
  const {
    posts,
    loading,
    refreshing,
    error,
    createPost,
    updatePost,
    deletePost,
    creating,
    updating,
    deletingPostId,
    refresh,
  } = usePostsViewModel();

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isSubmitting = creating || updating;

  const clearForm = () => {
    setEditingPostId(null);
    setTitle("");
    setBody("");
    setFormError(null);
  };

  const submit = async () => {
    try {
      setFormError(null);
      if (editingPostId) {
        await updatePost({ id: editingPostId, title, body });
      } else {
        await createPost({ title, body });
      }
      clearForm();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Request failed";
      setFormError(message);
    }
  };

  const onEdit = useCallback((postId: string, postTitle: string, postBody: string) => {
    setEditingPostId(postId);
    setTitle(postTitle);
    setBody(postBody);
    setFormError(null);
  }, []);

  const onDelete = useCallback(
    async (postId: string) => {
      try {
        await deletePost(postId);
      } catch (deleteError) {
        const message =
          deleteError instanceof Error ? deleteError.message : "Delete failed";
        setFormError(message);
      }
    },
    [deletePost],
  );

  const renderHeader = () => (
    <View style={styles.formCard}>
      <Text style={styles.header}>JSONPlaceholder CRUD</Text>
      <Text style={styles.subHeader}>Create, update, and delete posts</Text>

      <TextInput
        placeholder="Post title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Post body"
        value={body}
        onChangeText={setBody}
        multiline
        style={[styles.input, styles.multilineInput]}
      />

      {(formError || error) && (
        <Text style={styles.errorText}>{formError ?? error}</Text>
      )}

      <View style={styles.formActions}>
        <Pressable
          style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
          onPress={submit}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting
              ? "Saving..."
              : editingPostId
                ? "Update Post"
                : "Create Post"}
          </Text>
        </Pressable>
        {editingPostId && (
          <Pressable style={styles.secondaryButton} onPress={clearForm}>
            <Text style={styles.secondaryButtonText}>Cancel Edit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onEdit={(post) => onEdit(post.id, post.title, post.body)}
            onDelete={onDelete}
            isDeleting={deletingPostId === item.id}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={() => {
          void refresh();
        }}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  header: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subHeader: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d5d9de",
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 88,
    textAlignVertical: "top",
  },
  formActions: {
    gap: theme.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: theme.colors.surface,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  secondaryButtonText: {
    color: theme.colors.secondary,
    fontWeight: "600",
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
});
