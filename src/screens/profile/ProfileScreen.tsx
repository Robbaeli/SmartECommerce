import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../store/reducers/userSlice";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserData())
    navigation.navigate("AuthStack")
  }
  
  return (
    <AppSaveView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={"My Orders"}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton title={"Logout"} onPress={handleLogout}/>
      </View>

    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
