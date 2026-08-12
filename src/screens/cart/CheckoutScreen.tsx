import { Button, StyleSheet, Text, View } from "react-native";
import type { RootState } from "../../store/store";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import AppSaveView from "../../components/views/AppSaveView";
import { s, vs } from "react-native-size-matters";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { AppColors } from "../../styles/colors";
import AppTextInput from "../../components/inputs/AppTextInput";
import { IS_Android, IS_IOS, shippingFee, taxes } from "../../constants/constants";
import AppButton from "../../components/buttons/AppButton";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import type { Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { emptycart } from "../../store/reducers/cartSlice";
import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";


const schema = yup.object({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),

  phoneNumber: yup
  .string()
  .required("Phone number is required")
  .matches(/^\d{10}$/, "Phone number must be 10 digits"),


  address: yup
  .string()
  .required("Address is required")
  .min(15, "Address must be at least 15 characters long"),
  
}).required()

type FormData = yup.InferType<typeof schema>;


const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver:yupResolver(schema),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {userData} = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const totalProductsPriceSum = items.reduce((acc, item) => acc + item.sum, 0);
  const shippingFee = 10; // Assuming a fixed shipping cost of 10
  const taxes = totalProductsPriceSum * 0.1; // Assuming 10% tax
  const totalPrice = totalProductsPriceSum + taxes + shippingFee;






  const saveOrder = async (formData: FormData) => {

    try {
      const orderBody ={
        ...formData,
        items,
        totalProductsPriceSum,
        createdAt: new Date(),
        totalPrice,
        
      }
      const userOrderRef = collection(doc(db, "users", userData.uid!), "orders")
      const orderRef = await addDoc(userOrderRef, orderBody)
     showMessage({type: "success", message: "Order saved successfully!"})
      navigation.goBack()
      dispatch(emptycart())
    } catch (error) {
      console.log("Error saving order: ", error);
      showMessage({type: "danger", message: "Error saving order. Please try again."})
    }
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inPutContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder="Full Name"
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder="Phone Number"
          />
          <AppTextInputController
            control={control}
            name={"address"}
            placeholder="Address"
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm Order" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

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
});
