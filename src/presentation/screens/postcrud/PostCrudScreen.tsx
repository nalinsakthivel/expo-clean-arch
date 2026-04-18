import { makeStyles } from "@/presentation/theme/makeStyles";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostCard } from "../../components/PostCard";
import { usePostCrudScreen } from "./usePostCrud";

export const PostCrudScreen: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
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
  } = usePostCrudScreen();

  const renderHeader = () => (
    <View style={styles.formCard}>
      <Text style={styles.header}>{t("post.header")}</Text>
      <Text style={styles.subHeader}>{t("post.subHeader")}</Text>

      <TextInput
        placeholder={t("post.titlePlaceholder")}
        placeholderTextColor={styles.placeholder.color}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder={t("post.bodyPlaceholder")}
        placeholderTextColor={styles.placeholder.color}
        value={body}
        onChangeText={setBody}
        multiline
        style={[styles.input, styles.multilineInput]}
      />

      {(formError || queryError) && (
        <Text style={styles.errorText}>{formError ?? queryError}</Text>
      )}

      <View style={styles.formActions}>
        <Pressable
          style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
          onPress={submit}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting
              ? t("post.saving")
              : editingPostId
                ? t("post.updateBtn")
                : t("post.createBtn")}
          </Text>
        </Pressable>
        {editingPostId && (
          <Pressable style={styles.secondaryButton} onPress={clearForm}>
            <Text style={styles.secondaryButtonText}>
              {t("post.cancelEdit")}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={styles.placeholder.color} />
          <Text style={styles.loadingText}>{t("post.loading")}</Text>
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
            onEdit={onEditPost}
            onDelete={onDeletePost}
            isDeleting={deletingPostId === item.id}
          />
        )}
        removeClippedSubviews={true}
        windowSize={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
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

const useStyles = makeStyles((theme) => ({
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
  placeholder: {
    color: theme.colors.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
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
}));
