import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  disabled,
  onPress,
  loading,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        disabled
          ? [styles.container, styles.disabled, style]
          : [styles.container, styles.primary, style]
      }
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={disabled ? styles.textDisabled : styles.textPrimary}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "90%",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  textDisabled: {
    color: "#929dba",
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  disabled: {
    backgroundColor: "#EBEFF9",
  },
  primary: {
    backgroundColor: "#286EE6",
  },
});

export default Button;
