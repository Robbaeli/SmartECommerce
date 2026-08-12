import { StyleSheet, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";

import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

// 1- Form Controller Imports
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

// 3- Define the type
type FormData = yup.InferType<typeof schema>;

const SignInScreen = () => {
  // 4- init the useForm hook
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const onLoginPress = async (data: FormData) => {

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("MainAppBottomTabs");

const userDataObj = {
        uid: userCredential.user.uid,
      
      };

      dispatch(setUserData({ uid: userCredential.user.uid, email: userCredential.user.email }))
      


    } catch (error) {
      let errorMessage =""
      console.log((error as any).code);
      if ((error as any).code === "auth/user-not-found") {
        errorMessage = "User not found. Please check your email.";
      } else if ((error as any).code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else {
        errorMessage = "An error occurred during login. Please try again.";
      }
      Alert.alert("Login Error", errorMessage);
      console.log(error);
      
    }
  };


  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      {/* replace AppTextInput with  AppTextInputController*/}
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

      {/* add  handleSubmit function*/}
      <AppButton title="Login" onPress={handleSubmit(onLoginPress)} />
      <AppButton
        title="Sign Up"
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

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
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
