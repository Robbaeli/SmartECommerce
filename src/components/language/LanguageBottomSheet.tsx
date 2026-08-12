import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import AppText from '../texts/AppText'
import AppButton from '../buttons/AppButton'
import { s, vs } from 'react-native-size-matters'

const LanguageBottomSheet = () => {
  return (
    <ActionSheet id='LANG_SHEET'>
      <View style={styles.container}>

      <AppText style={{marginBottom: vs(20), textAlign:"center"}}>Change Language</AppText>

      <AppButton title='Confirm' onPress={() => {}}/>

      </View>
    </ActionSheet>
  )
}

export default LanguageBottomSheet

const styles = StyleSheet.create({
  container:{
    padding: s(16)
  }
})