import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import { AppFonts, Appfonts } from '../../styles/fonts'
import { Image } from 'react-native'
import AppText from '../texts/AppText'
const ProductCard = () => {
  return (
    <View style={styles.container}>

      {/* IMAGE UI */}
      <View style={styles.imageContainer}>
        <Image source={{uri: 'https://images.ctfassets.net/nproz1mx87a8/2g7bvZk26TwHbC32hWMamq/898229266037615099ec994a79a1c2e4/iPhone-17-Pro-Max-Orange-campaign.png'}} style={styles.image} />
      </View>

      {/* Details*/}
        <View style={styles.detailsContainer}>
            <AppText style={styles.titleText}>Apple iPhone 17 Pro Max</AppText>
            <AppText style={styles.priceText}>$ 1,299.99</AppText>
        </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(220),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    borderWidth: 1,
    borderColor: AppColors.lightGray,
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: s(160),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
    detailsContainer: {
        flex :1,
        paddingTop: vs(8),
        paddingBottom: vs(15),
        paddingHorizontal: s(10),
    },
    titleText: {
        fontSize: s(14),
        fontFamily: AppFonts.Medium,
        color: AppColors.primary,
    },
    priceText: {
        fontSize: s(14),
        fontFamily: AppFonts.Bold,
        color: AppColors.primary,
        marginTop: vs(7),
    }
});