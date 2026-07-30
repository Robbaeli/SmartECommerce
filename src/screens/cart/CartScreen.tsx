import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AppSaveView from '../../components/views/AppSaveView'
import HomeHeader from '../../components/headers/HomeHeader'
import EmptyCart from './EmptyCart'
import AppButton from '../../components/buttons/AppButton'
import CartItem from '../../components/cart/CartItem'
import TotalsView from '../../components/cart/TotalsView'
import { products } from '../../data/products'
import { sharedPaddingHorizontal } from '../../styles/sharedStyles'

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <AppSaveView>
      <HomeHeader />
      {/* <EmptyCart /> */}
      <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
      <FlatList
      data = {products}
      keyExtractor= {(item) => item.id.toString()}
        renderItem = {({item}) => (
           <CartItem
             {...item}
           />
           
       

        )}
         showsVerticalScrollIndicator={false}
      />
      <TotalsView itemsPrice={5000} orderTotal={5025} />
        <AppButton title='Checkout' onPress={() => navigation.navigate('CheckoutScreen')} /> 
      </View>
    </AppSaveView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  
})