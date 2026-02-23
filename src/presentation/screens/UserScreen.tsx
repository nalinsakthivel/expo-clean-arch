import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfile } from "../components/UserProfile";
import { theme } from "../theme/theme";

export const UserScreen: React.FC = () => {
  // In a real app, you might get this ID from route params.
  const MOCK_USER_ID = "1";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Clean Architecture example</Text>
        <Text style={styles.subHeader}>User Screen</Text>

        <View style={styles.content}>
          <UserProfile userId={MOCK_USER_ID} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subHeader: {
    ...theme.typography.h3,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
