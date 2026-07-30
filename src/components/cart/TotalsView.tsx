import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { taxes, shippingFee } from "../../constants/constants";
import { AppColors } from "../../styles/colors";

interface ITotalsView {
  itemsPrice: number;
  orderTotal: number;
}

const TotalsView: FC<ITotalsView> = ({ itemsPrice, orderTotal }) => {
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Items Price </AppText>
        <AppText style={styles.textPrice}>$ {itemsPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Taxes</AppText>
        <AppText style={styles.textPrice}>${taxes}</AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.textTitle}>Shipping Fee</AppText>
        <AppText style={styles.textPrice}>${shippingFee}</AppText>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <AppText style={styles.textTitle}>Order Total </AppText>
        <AppText style={styles.textPrice}>$ {orderTotal}</AppText>
      </View>
    </View>
  );
};

export default TotalsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: vs(10),
  },
  textTitle: {
    fontSize: s(16),
    flex: 1,
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(10),
    width: "100%",
  },
});
