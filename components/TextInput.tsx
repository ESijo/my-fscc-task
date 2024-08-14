import React, { FC, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  View,
} from "react-native";

interface TextInputProps {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  defaultValue?: string;
  onChangeText: () => void;
  value?: string;
}

const TextInput: FC<TextInputProps> = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  onChangeText,
  value,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isFocused || !!value?.length) && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholder}>{placeholder}</Text>
        </View>
      )}
      <RNTextInput
        style={styles.input}
        placeholder={isFocused ? "" : placeholder}
        secureTextEntry={isPasswordVisible}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleTogglePasswordVisibility}
        >
          <Image
            source={require("@/assets/images/visible.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 4,
    height: 48,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    padding: 16,
    borderRadius: 6,
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  icon: {
    color: "grey",
    height: 20,
    width: 20,
  },
  placeholderContainer: {
    backgroundColor: "#ffffff",
    position: "absolute",
    top: -10,
    left: 10,
    padding: 3,
    zIndex: 99,
  },
  placeholder: {
    fontSize: 12,
    color: "#D0D5DD",
  },
});

export default TextInput;
