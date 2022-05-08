import { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import * as FileSystem from "expo-file-system";

import { ScreenshotButton } from "./ScreenshotButton";
import { SubmitButton } from "./SubmitButton";

import { FeedbackType } from "../types";
import { api } from "../../services/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { styles } from "./styles";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSubmitted: () => void;
}

export function Form({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSubmitted,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback() {
    try {
      setIsSubmitting(true);

      let screenshotbase64 = "";

      if (screenshot) {
        screenshotbase64 = await FileSystem.readAsStringAsync(screenshot, {
          encoding: "base64",
        });
      }

      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotbase64}`,
      });

      onFeedbackSubmitted();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackRestartRequested}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.image} />
          <Text style={styles.title}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        onChangeText={(text) => setComment(text)}
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={(screenshot) => setScreenshot(screenshot)}
          onRemoveScreenshot={() => setScreenshot(null)}
        />
        <SubmitButton
          isSubmitting={isSubmitting}
          onPress={handleSubmitFeedback}
        />
      </View>
    </View>
  );
}
