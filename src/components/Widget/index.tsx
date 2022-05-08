import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Options } from "../Options";
import { Form } from "../Form";
import { Success } from "../Success";

import { styles } from "./styles";
import { theme } from "../../theme";
import { FeedbackType } from "../types";

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity onPress={handleOpen} style={styles.button}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onFeedbackRestartRequested={handleRestartFeedback} />
        ) : feedbackType ? (
          <Form
            feedbackType={feedbackType}
            onFeedbackRestartRequested={handleRestartFeedback}
            onFeedbackSubmitted={() => setFeedbackSent(true)}
          />
        ) : (
          <Options
            onFeedbackTypeChanged={(feedbackType) =>
              setFeedbackType(feedbackType)
            }
          />
        )}
      </BottomSheet>
    </>
  );
}

// this is necessary for the gestures to work.
export default gestureHandlerRootHOC(Widget);
