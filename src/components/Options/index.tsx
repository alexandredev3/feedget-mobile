import React from "react";
import { Text, View } from "react-native";

import { Copyright } from "../Copyright";
import { OptionButton } from "./OptionButton";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../types";

import { styles } from "./styles";

interface OptionsProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <OptionButton
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
