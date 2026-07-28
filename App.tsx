import { StatusBar } from 'expo-status-bar';
import AppText from './src/components/texts/AppText';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MainAppStack from './src/navigation/MainAppStack';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded]  = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf")
  })

  if(!fontsLoaded) {
    return <ActivityIndicator size={"large"}/>
  }


  return (
    <>
    <NavigationContainer>
      <FlashMessage position={"top"}/>
      <MainAppStack />
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
