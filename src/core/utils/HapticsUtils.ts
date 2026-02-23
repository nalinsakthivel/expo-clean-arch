import * as Haptics from "expo-haptics";

export const HapticsUtils = {
  triggerSuccess: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  triggerError: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
  triggerWarning: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },
  triggerLight: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  triggerMedium: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  triggerHeavy: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },
  triggerRigid: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  },
  triggerSelection: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  triggerNotification: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  triggerVibrate: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
};
