import i18n from "@/core/i18n";
import { useAppTheme } from "@/presentation/theme/ThemeContext";
import { makeStyles } from "@/presentation/theme/makeStyles";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SettingsScreen: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { theme, isDark, toggleTheme, setSystemTheme } = useAppTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{t("settings.title")}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.theme")}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>
              {isDark ? t("settings.darkTheme") : t("settings.lightTheme")}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={theme.colors.surface}
            />
          </View>
          <Pressable style={styles.button} onPress={setSystemTheme}>
            <Text style={styles.buttonText}>{t("settings.systemTheme")}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.language")}</Text>
          <Pressable
            style={[
              styles.button,
              i18n.language === "en" && styles.buttonActive,
            ]}
            onPress={() => changeLanguage("en")}
          >
            <Text
              style={[
                styles.buttonText,
                i18n.language === "en" && styles.buttonTextActive,
              ]}
            >
              {t("settings.english")}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              i18n.language === "ta" && styles.buttonActive,
            ]}
            onPress={() => changeLanguage("ta")}
          >
            <Text
              style={[
                styles.buttonText,
                i18n.language === "ta" && styles.buttonTextActive,
              ]}
            >
              {t("settings.tamil")}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.md,
  },
  header: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  section: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  button: {
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  buttonTextActive: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
}));
