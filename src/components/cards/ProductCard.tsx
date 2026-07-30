import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import IonIcons from "@expo/vector-icons/Ionicons";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";

interface IProductCard {
  onAddToCartPress: () => void;
  title: string;
  price: number;
  imageURL: string;
}

const ProductCard: FC<IProductCard> = ({
  title,
  price,
  imageURL,
  onAddToCartPress,
}: IProductCard) => {
  return (
    <View style={styles.container}>
      {/* Add To Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          onAddToCartPress();
        }}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <IonIcons name="cart" size={s(15)} color={AppColors.white} />
      </TouchableOpacity>

      {/* IMAGE UI */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageURL,
          }}
          style={styles.image}
        />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>{price}</AppText>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(220),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: s(160),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
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
  },
  addToCartButton: {
    position: "absolute",
    height: s(28),
    width: s(28),
    left: s(8),
    top: vs(8),
    borderRadius: s(14),
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
