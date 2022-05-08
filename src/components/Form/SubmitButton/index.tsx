import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import { theme } from "../../../theme";
import { styles } from "./styles";

interface SubmitButtonProps extends TouchableOpacityProps {
  isSubmitting?: boolean;
}

export function SubmitButton({
  isSubmitting = false,
  disabled,
  ...rest
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled || isSubmitting}
      {...rest}
    >
      {isSubmitting ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar Feedback</Text>
      )}
    </TouchableOpacity>
  );
}
