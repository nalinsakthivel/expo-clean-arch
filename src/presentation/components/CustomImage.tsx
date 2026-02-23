import Icon from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Modal,
  Platform,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomImageProps {
  source: string | ImageSourcePropType;
  fallbackSource?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  zoomEnabled?: boolean;
  tintColor?: string;
}

export const CustomImage = ({
  source,
  fallbackSource = require("../../../assets/images/icon.png"),
  style,
  containerStyle,
  contentFit = "contain",
  zoomEnabled = false,
  tintColor,
}: CustomImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const imgSource = useMemo(() => {
    return hasError ? fallbackSource : source;
  }, [hasError, source, fallbackSource]);

  const handleError = useCallback(() => {
    setHasError(true);
    setLoading(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const openViewer = () => {
    if (zoomEnabled) setVisible(true);
  };

  const closeViewer = () => setVisible(false);

  const renderImage = () => (
    <Image
      source={imgSource}
      style={[styles.image, style, tintColor && { tintColor }]}
      contentFit={contentFit}
      cachePolicy="disk"
      placeholder={fallbackSource}
      transition={200}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {zoomEnabled ? (
        <TouchableOpacity activeOpacity={0.9} onPress={openViewer}>
          {renderImage()}
        </TouchableOpacity>
      ) : (
        renderImage()
      )}
      <Modal visible={visible} transparent animationType="fade">
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity onPress={closeViewer} style={styles.closeBtn}>
            <Icon name="close" size={22} color="#ff3b30" />
          </TouchableOpacity>

          <Image
            source={imgSource}
            style={styles.modalImage}
            contentFit="contain"
            cachePolicy="disk"
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "80%",
  },
  closeBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 15,
    right: 20,
    backgroundColor: "#fff",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
