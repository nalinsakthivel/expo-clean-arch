interface ToastProps {
  type: "success" | "warn" | "error" | "info";
  text1: string;
}

export const showToast = ({ type, text1 }: ToastProps) => {
  // Basic implementation, in real app use react-native-toast-message
  console.log(`[TOAST ${type.toUpperCase()}] ${text1}`);
};
