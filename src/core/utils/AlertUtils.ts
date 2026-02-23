import { Alert } from "react-native";

interface AlertCallbackProps {
  title: string;
  msg: string;
  onClick: () => void;
}

export const createOneButtonAlertCallback = ({
  title,
  msg,
  onClick,
}: AlertCallbackProps) => {
  Alert.alert(title, msg, [{ text: "OK", onPress: onClick }]);
};
