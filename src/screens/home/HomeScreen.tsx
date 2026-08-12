import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { s, vs } from "react-native-size-matters";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import { AppFonts } from "../../styles/fonts";
import ProductCard from "../../components/cards/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import { products } from "../../data/products";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../store/reducers/cartSlice";
import { getProductsData } from "../../config/dataServices";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState<any[]>([]);

const fetchProducts = async () => {
  const data = await getProductsData();
  setProducts(data);
};

useEffect(() => {
  fetchProducts();
}, []);

  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURL={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCartPress={() => {dispatch(addItemsToCart(item))}}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
        }}
        contentContainerStyle={{ paddingHorizontal: s(10), paddingTop: vs(10) }}
      />
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
