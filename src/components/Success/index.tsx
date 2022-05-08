import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { Copyright } from "../Copyright";

import successImg from "../../assets/success.png";
import { styles } from "./styles";

interface SuccessProps {
  onFeedbackRestartRequested: () => void;
}

export function Success({ onFeedbackRestartRequested }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={successImg} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onFeedbackRestartRequested}
      >
        <Text style={styles.buttonTitle}>Quero enviar outro feedback</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
