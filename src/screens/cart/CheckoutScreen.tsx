import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSaveView from '../../components/views/AppSaveView'
import { s, vs } from 'react-native-size-matters'
import { commonStyles, sharedPaddingHorizontal } from '../../styles/sharedStyles'
import { AppColors } from '../../styles/colors'
import AppTextInput from '../../components/inputs/AppTextInput'
import { IS_Android, IS_IOS } from '../../constants/constants'
import AppButton from '../../components/buttons/AppButton'

const CheckoutScreen = () => {
  return (
    <AppSaveView>
        <View style={{paddingHorizontal: sharedPaddingHorizontal}}>
        
        <View style={styles.inPutContainer}>
            <AppTextInput placeholder='Full Name' />
            <AppTextInput placeholder='Phone Number' />
            <AppTextInput placeholder='Address' />
            </View>

        </View>

        <View style={styles.bottomButtonContainer}>
    <AppButton title='Confirm Order' />
        </View>
    </AppSaveView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  inPutContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : undefined,
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_Android ? vs(25) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
   
  },
})