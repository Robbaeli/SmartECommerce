import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const EmptyCart = () => {
  const navigation = useNavigation();
  const navigateToProducts = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="shopping-outline"
        size={s(50)}
        color={AppColors.primary}
        style={{ marginBottom: vs(20) }}
      />
      <AppText style={styles.title}>Your Cart Is Empty</AppText>
      <AppText style={styles.subtitle}>
        Browse our products and find siomething you like.
      </AppText>
      <AppButton
        style={styles.button}
        title="Start Shopping"
        onPress={navigateToProducts}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: s(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginBottom: vs(10),
  },
  subtitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    textAlign: "center",
    marginBottom: vs(20),
  },
  button: {
    width: "80%",
  },
});
