import { formatDate } from "@/core/utils/formatDate";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/theme";
import { useUserViewModel } from "../viewmodels/useUserViewModel";

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  // Use the ViewModel to get state and logic
  const { user, loading, error } = useUserViewModel(userId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    // Ideally use string resources from a localization file or constants
    return (
      <View style={styles.center}>
        <Text style={styles.emptyState}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.date}>Joined: {formatDate(user.createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h2,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
  },
  emptyState: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
});
