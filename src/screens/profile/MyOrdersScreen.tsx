import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import OrderItem from "../../components/cart/OrderItem";
import AppSafeView from "../../components/views/AppSaveView";
import { fetchUserOrders } from "../../config/dataServices";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";

const MyOrdersScreen = () => {
  // Dummy data for rendering the component
  const orderData = [
    {
      id: 1,
      date: "2025-01-01",
      totalAmount: 120.5,
      totalPrice: "$150",
    },
    {
      id: 2,
      date: "2025-01-02",
      totalAmount: 75.0,
      totalPrice: "$90",
    },
    {
      id: 3,
      date: "2025-01-03",
      totalAmount: 200.25,
      totalPrice: "$250",
    },
  ];

  const { userData } = useSelector((state: RootState) => state.userSlice);
  const [ordersList, setOrdersList] = useState<any[]>([])

  const getOrders = async() => { 
     const response = await fetchUserOrders(userData?.uid ?? "")
     if (response) setOrdersList(response)
  }

  useEffect(() => {
    getOrders()
  },[])
 
  return (
    <AppSafeView>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: sharedPaddingHorizontal }}
        data={ordersList}
        keyExtractor={(item, index) => item?.id.toString()}
        renderItem={({ item }) => { 

          console.log('==================item================');
          console.log(JSON.stringify(item, null, 3));
          console.log('====================================');

          return (
          <OrderItem
            date={getDateFromFireStoreTimeStampObject(item.createdAt)}
            totalAmount={item.totalProductsPriceSum}
            totalPrice={item.totalPrice}
            style={{ marginBottom: 10 }}
          />
        )}}
      />
    </AppSafeView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({});
