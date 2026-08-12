import { StyleSheet, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

// Form Controller Imports
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("User name is required")
      .min(5, "User name must be more than 5 characters"),
    email: yup.string().email("Email is wrong").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onSignUpPress = async (data: FormData) => {
  try {

    const usercredential = await createUserWithEmailAndPassword(
      auth,
       data.email,
        data.password);

    Alert.alert("User Created");
    navigation.navigate("MainAppBottomTabs");
    dispatch(setUserData({ uid: usercredential.user.uid, email: usercredential.user.email }));

  } catch (error: any) {
    let errorMessage = ""
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Email already in use. Please try another email.");
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Invalid email. Please enter a valid email address.");
    } else if (error.code === "auth/weak-password") {
      Alert.alert("Weak password. Please choose a stronger password.");
    } else {
      Alert.alert("Error creating user. Please try again later.");
    }
  }
};

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController<FormData>
        control={control}
        name="userName"
        placeholder="User Name"
      />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title="Create New Account"
        onPress={handleSubmit(onSignUpPress)}
      />
      <AppButton
        title="Go To Sign In"
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
