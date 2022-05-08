import React from "react";
import { View, TouchableOpacity, Image, Alert } from "react-native";
import { Camera, Trash } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";

import { theme } from "../../../theme";
import { styles } from "./styles";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onTakeScreenshot: (screenshot: string) => void;
  onRemoveScreenshot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onTakeScreenshot,
  onRemoveScreenshot,
}: ScreenshotButtonProps) {
  async function handleScreenshot() {
    try {
      const screenshotURI = await captureScreen({
        format: "png",
        quality: 0.8,
      });

      onTakeScreenshot(screenshotURI);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Não foi possível tirar uma screenshot.");
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : handleScreenshot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />

          <Trash
            size={22}
            color={theme.colors.text_secondary}
            weight="fill"
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} color={theme.colors.text_secondary} weight="bold" />
      )}
    </TouchableOpacity>
  );
}
