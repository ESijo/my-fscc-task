import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, UserData } from "@/hooks/useLoginAuth";

const schema = yup.object().shape({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  password: yup.string().required("Password is required."),
});

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLogedIn, setisLogedIn] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setisLogedIn(true);
    },
    onError: console.error,
  });

  const onSubmit = (data: UserData) => {
    mutation.mutate(data);
  };

  const password = watch("password");
  const email = watch("email");

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={require("@/assets/images/loginBackground.png")}
          resizeMode="cover"
        >
          <View style={styles.topGap} />

          <View style={styles.content}>
            <Image
              style={styles.image}
              source={require("@/assets/images/oms_blue.png")}
            />
            {isLogedIn ? (
              <Text style={styles.email}>
                {`El. paštas: `}
                <Text style={styles.text}>{email}</Text>
              </Text>
            ) : (
              <>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder={"El. paštas"}
                      keyboardType="email-address"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder={"Slaptažodis"}
                      secureTextEntry
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </>
            )}
            <Button
              text={isLogedIn ? "Atsijungti" : "Prisijungti"}
              onPress={
                isLogedIn
                  ? () => {
                      setisLogedIn(false);
                    }
                  : handleSubmit(onSubmit)
              }
              disabled={!email || !password || mutation.isPending}
              loading={mutation.isPending}
              style={styles.button}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Image source={require("@/assets/images/fscc_logo.png")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  topGap: {
    height: 250,
  },
  image: {
    marginBottom: 72,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "normal",
  },
  email: {
    paddingBottom: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 24,
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  button: {
    marginTop: 16,
    marginBottom: 64,
  },
});
