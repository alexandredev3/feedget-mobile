import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from "react-native";

import { styles } from "./styles";

interface OptionsButtonProps extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export function OptionButton({ title, image, ...rest }: OptionsButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
